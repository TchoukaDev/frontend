"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const Carousel = ({
  images = [],
  gallery = false,
  folders = [],
  onChangeFolder,
  selectedFolder,
  isFetching,
}) => {
  // État pour savoir quelle image est affichée actuellement
  const [index, setIndex] = useState(0);

  // Direction de l'animation : 1 = droite, -1 = gauche
  const [direction, setDirection] = useState(1);

  // true quand on survole les contrôles (pour arrêter l'auto-play)
  const [paused, setPaused] = useState(false);

  // Calculer le nombre total de photos
  const foldersCounts = folders.map((f) => f.count);
  const totalCount = foldersCounts.reduce((acc, count) => acc + count, 0);

  const nextSlide = () => {
    setDirection(1); // Animation vers la droite
    setIndex((prev) => (prev + 1) % images.length); // Retour à 0 après la dernière image
  };

  const prevSlide = () => {
    setDirection(-1); // Animation vers la gauche
    setIndex((prev) => (prev - 1 + images.length) % images.length); // Retour à la fin si on est à 0
  };

  // Configuration des animations Framer Motion
  const variants = {
    // État initial : l'image arrive depuis la droite ou la gauche
    enter: (dir) => ({
      x: dir > 0 ? -100 : 100, // Position de départ en %
      opacity: 0,
    }),
    // État central : l'image est visible au centre
    center: { x: 0, opacity: 1 },
    // État de sortie : l'image part vers la droite ou la gauche
    exit: (dir) => ({
      x: dir > 0 ? 100 : -100, // Position finale en %
      opacity: 0,
    }),
  };

  // Auto-play : change d'image toutes les 5 secondes
  useEffect(() => {
    if (paused || images.length === 0) return; // Ne fait rien si en pause

    const timeout = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout); // Nettoie le timer quand l'index change
  }, [index, paused, images.length]); // Se relance à chaque changement d'index

  // Préchargement : charge les images adjacentes en avance
  useEffect(() => {
    if (images.length === 0) return;

    // Calcule l'index de l'image suivante et précédente
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index - 1 + images.length) % images.length;

    // Précharge ces images dans le navigateur
    [nextIndex, prevIndex].forEach((i) => {
      const img = new window.Image();
      img.src = `${images[i]?.url}`;
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
          {/* AnimatePresence gère l'entrée/sortie des animations */}
          <AnimatePresence mode="wait" custom={direction}>
            {/* motion.div = div animé par Framer Motion */}
            <motion.div
              key={index} // Change la clé = nouvelle animation
              custom={direction} // Passe la direction aux variants
              variants={variants} // Utilise les animations définies plus haut
              initial="enter" // Commence par l'état "enter"
              animate="center" // Anime vers l'état "center"
              exit="exit" // Sort avec l'état "exit"
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
                    src={`${images[index]?.url}`}
                    alt={images[index]?.alternativeText || `Slide ${index + 1}`}
                    fill // Prend tout l'espace du parent
                    className="object-cover" // Remplit sans déformer
                    priority={index === 0} // Charge la première image en priorité
                    sizes="(max-width: 768px) 95vw, 768px"
                  />
                  {images[index]?.caption && gallery && (
                    <div className="absolute bg-blue3 w-fit p-1 md:p-3 text-xs md:text-base text-center rounded-full text-sand font-semibold top-5 left-1/2 transform -translate-x-1/2">
                      {images[index]?.caption}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bouton précédent */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setPaused(true)} // Pause l'auto-play au survol
          onMouseLeave={() => setPaused(false)} // Reprend l'auto-play
          className={`absolute top-1/2  -translate-y-1/2 bg-sand/70 ${gallery ? " left-2 md:left-4 p-1 md:p-2" : "left-1 px-1"} rounded-full  shadow cursor-pointer opacity-60 hover:opacity-80 transition-all`}
          aria-label="Image précédente"
        >
          ◀
        </button>

        {/* Bouton suivant */}
        <button
          onClick={nextSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={`absolute top-1/2  -translate-y-1/2 bg-sand/70 ${gallery ? " right-2 md:right-4 p-1 md:p-2" : "right-1 px-1"} rounded-full  shadow cursor-pointer opacity-60 hover:opacity-80 transition-all`}
          aria-label="Image suivante"
        >
          ▶
        </button>

        {/* Points indicateurs en bas */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1); // Direction selon la position cible
                setIndex(i); // Va directement à l'image cliquée
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                i === index ? "bg-white" : "bg-gray-400/70" // Point blanc pour l'image active
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Sélecteur de dossier */}
      <div className="text-center">
        <select
          className="border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm    focus:ring-2 focus:ring-blue-500 focus:border-blue-500    disabled:opacity-50 disabled:cursor-not-allowed    cursor-pointer min-w-[70px] bg-sand"
          value={selectedFolder || "all"}
          onChange={(e) => {
            onChangeFolder(e.target.value);
          }}
        >
          <option value="all">Toutes les photos ({totalCount})</option>
          {folders?.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom} ({f.count})
            </option>
          ))}
        </select>
      </div>

      {/* Galerie de miniatures en bas */}
      {gallery &&
        (isFetching ? (
          <div className="flex items-center justify-center">
            <ClipLoader size={60} color="#41c9e2" />
          </div>
        ) : (
          <div className="flex gap-5 md:gap-20 flex-wrap items-center justify-center">
            {images.map((image, i) => (
              <div key={image.id} className="flex flex-col items-center gap-2">
                <div className=" size-12 md:size-25 relative">
                  <Image
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    onMouseEnter={() => {
                      // Précharge l'image en grand quand on survole la miniature
                      const img = new window.Image();
                      img.src = `${image?.url}`;
                    }}
                    src={`${image?.url}`}
                    alt={image.alternativeText || `Miniature ${i + 1}`}
                    fill
                    className={`object-cover aspect-square rounded cursor-pointer transition-all ${
                      i === index ? "border-3 border-blue3 shadow-lg" : "" // Bordure sur la miniature active
                    }`}
                    priority={i < 3} // Les 3 premières miniatures chargent en priorité
                  />
                </div>
                {image?.caption && (
                  <div className="hidden md:block">{image.caption}</div>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Carousel;
