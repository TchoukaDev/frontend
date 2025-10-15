"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Carousel = ({ images = [] }) => {
  // État pour savoir quelle image est affichée actuellement
  const [index, setIndex] = useState(0);

  // Direction de l'animation : 1 = droite, -1 = gauche
  const [direction, setDirection] = useState(1);

  // true quand on survole les contrôles (pour arrêter l'auto-play)
  const [paused, setPaused] = useState(false);

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
    <div className="space-y-20">
      <div className="relative w-[95%] max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl shadow-blue3/40 border border-blue2">
        {/* Zone d'affichage principale */}
        <div className="relative h-64 md:h-96">
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
              {images.length < 1 ? (
                <div className="font-semibold flex justify-center items-center h-full">
                  Aucune image n'a été publiée pour le moment
                </div>
              ) : (
                <Image
                  src={`${images[index]?.url}`}
                  alt={images[index]?.alternativeText || `Slide ${index + 1}`}
                  fill // Prend tout l'espace du parent
                  className="object-cover" // Remplit sans déformer
                  priority={index === 0} // Charge la première image en priorité
                  sizes="(max-width: 768px) 95vw, 768px"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bouton précédent */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setPaused(true)} // Pause l'auto-play au survol
          onMouseLeave={() => setPaused(false)} // Reprend l'auto-play
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow cursor-pointer opacity-60 hover:opacity-80 transition-all"
          aria-label="Image précédente"
        >
          ◀
        </button>

        {/* Bouton suivant */}
        <button
          onClick={nextSlide}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow cursor-pointer opacity-60 hover:opacity-80 transition-all"
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

      {/* Galerie de miniatures en bas */}
      <div className="flex gap-20 flex-wrap items-center justify-center">
        {images.map((image, i) => (
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
            key={image.id}
            src={`${image?.url}`}
            alt={image.alternativeText || `Miniature ${i + 1}`}
            width={100}
            height={100}
            className={`object-cover aspect-square rounded cursor-pointer transition-all ${
              i === index ? "border-3 border-blue3 shadow-lg" : "" // Bordure sur la miniature active
            }`}
            priority={i < 3} // Les 3 premières miniatures chargent en priorité
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
