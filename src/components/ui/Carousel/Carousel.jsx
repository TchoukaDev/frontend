"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Carousel = ({ images = [], strapiUrl }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = vers la droite, -1 = vers la gauche
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

  useEffect(() => {
    if (paused) return; // <-- si en pause, on ne lance pas de timeout

    const timeout = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout); // nettoyage
  }, [index, paused]);

  return (
    <div className="space-y-20">
      <div className="relative w-[95%] max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl shadow-blue3/40 border border-blue2">
        {/* Zone d’affichage */}
        <div className="relative h-64 md:h-96">
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
              {images.length < 1 ? (
                <div className="font-semibold flex justify-center items-center h-full">
                  Aucune image n'a été publiée pour le moment
                </div>
              ) : (
                <Image
                  src={`${strapiUrl}${images[index].url}`}
                  alt={`Slide ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  priority={index === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bouton prev */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow cursor-pointer opacity-60 hover:opacity-80 transition-all"
        >
          ◀
        </button>

        {/* Bouton next */}
        <button
          onClick={nextSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow cursor-pointer opacity-60 hover:opacity-80 transition-all"
        >
          ▶
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-white" : "bg-gray-400/70"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-20 flex-wrap items-center justify-center">
        {images.map((image, i) => (
          <Image
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            key={image.id}
            src={`${strapiUrl}${image.url}`}
            alt={image.alternativeText}
            width={100}
            height={100}
            unoptimized
            className={`object-cover aspect-square rounded cursor-pointer transition-all ${
              i === index && "border-3 border-blue3 shadow-lg"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
