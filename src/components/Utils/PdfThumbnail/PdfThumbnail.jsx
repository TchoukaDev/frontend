"use client";
// Nécessaire car on utilise des hooks React et l'API Canvas

import { useEffect, useRef, useState } from "react";
// useEffect : pour les effets de bord (chargement du PDF)
// useRef : pour garder une référence à l'élément canvas du DOM
// useState : pour gérer l'état du composant (loading)

let pdfjsLib;

if (typeof window !== "undefined") {
  pdfjsLib = require("pdfjs-dist/webpack");
}

export default function PdfThumbnail({ url }) {
  const canvasRef = useRef();
  // Créé une référence mutable qui persistera entre les re-renders
  // Permettra d'accéder directement à l'élément <canvas> du DOM

  const [loading, setLoading] = useState(true);
  // État pour gérer l'affichage : true = afficher le loader, false = afficher le canvas
  // Initialisé à true pour montrer le loader au démarrage

  useEffect(() => {
    // Premier useEffect : responsable du chargement et du rendu du PDF

    const loadPdf = async () => {
      // Fonction asynchrone pour charger le PDF

      try {
        const loadingTask = pdfjsLib.getDocument({ url, disableWorker: true });
        // Crée une tâche de chargement pour le PDF
        // url : l'URL du fichier PDF à charger
        // disableWorker: true désactive le web worker (moins performant mais plus simple)

        const pdf = await loadingTask.promise;
        // Attend que le PDF soit complètement chargé
        // pdf contient l'objet document PDF

        const page = await pdf.getPage(1);
        // Récupère la première page du PDF
        // Les pages sont indexées à partir de 1 (et non 0)

        const scale = 1.5;
        // Facteur d'échelle pour le rendu
        // 1.5 = 150% de la taille originale pour une meilleure qualité
        // Le canvas sera ensuite redimensionné avec CSS

        const viewport = page.getViewport({ scale });
        // Obtient les dimensions de la page avec l'échelle appliquée
        // viewport contient width, height et d'autres infos de transformation

        const canvas = canvasRef.current;
        // Récupère l'élément canvas du DOM via la référence

        if (!canvas) {
          // Vérification de sécurité : le canvas existe-t-il ?
          console.error("Canvas ref not available");
          return; // Sort de la fonction si pas de canvas
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        // Définit les dimensions réelles du canvas en pixels
        // Important : ce sont les dimensions de rendu, pas d'affichage

        const context = canvas.getContext("2d");
        // Obtient le contexte de dessin 2D du canvas
        // Nécessaire pour dessiner le contenu du PDF

        await page.render({ canvasContext: context, viewport }).promise;
        // Effectue le rendu de la page PDF sur le canvas
        // C'est une opération asynchrone qui dessine pixel par pixel

        setLoading(false);
        // Met loading à false pour cacher le loader et afficher le canvas
      } catch (err) {
        // Gestion des erreurs (PDF invalide, réseau, etc.)
        console.error("Erreur lors du rendu du PDF :", err);
        setLoading(false);
        // On met quand même loading à false pour éviter un loader infini
      }
    };

    if (!loading) {
      // Ne lance loadPdf() que si loading est false
      // Assure que le canvas est dans le DOM avant de l'utiliser
      loadPdf();
    }
  }, [url, loading]);
  // Dépendances : re-exécute si url ou loading change
  // url : pour recharger si l'URL du PDF change
  // loading : pour déclencher le chargement après le montage

  useEffect(() => {
    // Deuxième useEffect : s'exécute une seule fois au montage
    setLoading(false);
    // Met loading à false, ce qui :
    // 1. Cache le loader et affiche le canvas (vide)
    // 2. Déclenche le premier useEffect qui charge le PDF
  }, []);
  // Tableau vide = s'exécute uniquement au montage du composant

  return (
    <a
      href={url}
      // L'URL du PDF pour l'ouverture dans un nouvel onglet
      target="_blank"
      // Ouvre le lien dans un nouvel onglet
      rel="noopener noreferrer"
      // Sécurité : empêche la nouvelle page d'accéder à window.opener
      className="inline-block"
      // inline-block permet au lien de respecter les dimensions de son contenu
    >
      <div className="relative">
        {/* Container avec position relative pour le positionnement */}

        <canvas
          ref={canvasRef}
          // Attache la référence à cet élément canvas

          className="border rounded shadow cursor-pointer hover:scale-105 transition
                    w-[300px] md:w-[500px]
                     h-auto object-contain"
          style={{
            display: loading ? "none" : "block",
            // Cache le canvas pendant le chargement
            maxWidth: "100%",
            // Empêche le canvas de dépasser son container
          }}
        />

        {loading && (
          // Rendu conditionnel : affiche uniquement si loading est true
          <div
            className=" w-[300px] md:w-[500px]
                          flex items-center justify-center border rounded shadow"
          >
            Chargement...
            {/* Texte affiché pendant le chargement */}
          </div>
        )}
      </div>
    </a>
  );
}
