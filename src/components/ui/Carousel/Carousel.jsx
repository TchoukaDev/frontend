"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const Carousel = ({
  images = [],
  gallery = false,
  folders = [],
  rootCount = 0,
  totalCount = 0,
  onChangeFolder,
  selectedFolder,
  isFetching,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Auto-play
  useEffect(() => {
    if (paused || images.length === 0) return;

    const timeout = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [index, paused, images.length]);

  // Préchargement
  useEffect(() => {
    if (images.length === 0) return;

    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index - 1 + images.length) % images.length;

    [nextIndex, prevIndex].forEach((i) => {
      const img = new window.Image();
      img.src = images[i]?.image?.url || "";
    });
  }, [index, images]);

  return (
    <div className="space-y-10 md:space-y-20">
      <div
        className={`relative w-[95%] max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl ${gallery && "shadow-blue3/40"} border border-blue2`}
      >
        {/* Zone d'affichage principale */}
        <div
          className={`relative ${gallery ? "h-52 md:h-96" : "h-[100px] md:h-[150px]"}`}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              {isFetching ? (
                <div className="flex h-full items-center justify-center">
                  <ClipLoader size={80} color="#41c9e2" />
                </div>
              ) : images.length < 1 ? (
                <div
                  className={`font-semibold ${gallery ? "text-base" : "text-sm md:text-base"} flex justify-center items-center h-full`}
                >
                  {gallery
                    ? "Aucune image n'a été publiée pour le moment"
                    : "Aucune photo"}
                </div>
              ) : (
                <>
                  <Image
                    src={images[index]?.image?.url || ""}
                    alt={
                      images[index]?.titre ||
                      images[index]?.image?.alternativeText ||
                      `Slide ${index + 1}`
                    }
                    fill
                    className="object-contain "
                    priority={index === 0}
                    sizes="(max-width: 768px) 95vw, 768px"
                  />
                  {(images[index]?.titre || images[index]?.image?.caption) &&
                    gallery && (
                      <div className="absolute bg-blue3 w-fit p-1 md:p-3 text-xs md:text-base text-center rounded-full text-sand font-semibold top-5 left-1/2 transform -translate-x-1/2">
                        {images[index]?.titre || images[index]?.image?.caption}
                      </div>
                    )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Boutons */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`absolute top-1/2 -translate-y-1/2 bg-sand/70 ${gallery ? "left-2 md:left-4 p-1 md:p-2" : "left-1 px-1"} rounded-full shadow cursor-pointer opacity-60 hover:opacity-80 transition-all`}
          aria-label="Image précédente"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`absolute top-1/2 -translate-y-1/2 bg-sand/70 ${gallery ? "right-2 md:right-4 p-1 md:p-2" : "right-1 px-1"} rounded-full shadow cursor-pointer opacity-60 hover:opacity-80 transition-all`}
          aria-label="Image suivante"
        >
          ▶
        </button>

        {/* Points indicateurs */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                i === index ? "bg-white" : "bg-gray-400/70"
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {gallery && (
        <>
          {/* Sélecteur de dossier */}
          <div className="mx-auto relative w-fit">
            <select
              className="border border-gray-300 rounded-md px-5 py-1 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[70px] max-w-[300px] bg-sand"
              value={selectedFolder || "all"}
              onChange={(e) => onChangeFolder(e.target.value)}
            >
              <option value="all">
                {isFetching
                  ? "Chargement..."
                  : `Toutes les photos (${totalCount})`}
              </option>
              <option value="root">Autres photos ({rootCount})</option>
              {folders?.map((folder) => (
                <option key={folder.id} value={folder.slug}>
                  {folder.nom} ({folder.count})
                </option>
              ))}
            </select>
            {isFetching && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <ClipLoader size={15} color="#41c9e2" />
              </div>
            )}
          </div>

          {/* Galerie miniatures */}
          {isFetching ? (
            <div className="flex items-center justify-center">
              <ClipLoader size={60} color="#41c9e2" />
            </div>
          ) : (
            <div className="flex gap-5 md:gap-20 flex-wrap items-center justify-center">
              {images.map((image, i) => (
                <div
                  key={image.id}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="size-12 md:size-25 relative">
                    <Image
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      onMouseEnter={() => {
                        const img = new window.Image();
                        img.src = image?.image?.url || "";
                      }}
                      src={
                        image?.image?.formats?.thumbnail?.url ||
                        image?.image?.url ||
                        ""
                      }
                      alt={
                        image?.titre ||
                        image?.image?.alternativeText ||
                        `Miniature ${i + 1}`
                      }
                      fill
                      className={`object-cover aspect-square rounded cursor-pointer transition-all ${
                        i === index ? "border-3 border-blue3 shadow-lg" : ""
                      }`}
                      priority={i < 3}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Carousel;
