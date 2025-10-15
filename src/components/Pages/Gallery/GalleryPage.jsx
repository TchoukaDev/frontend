"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";
import { useGetGallery } from "@/hooks/useGetGallery";

/**
 * Composant de galerie photos avec pagination dynamique
 *
 * Fonctionnement :
 * - Charge les photos par blocs (ex: 10 par 10)
 * - "Voir plus" ajoute un bloc de photos
 * - "Voir moins" retire un bloc de photos
 * - Précharge automatiquement le bloc suivant en arrière-plan
 *
 * @param {Object} initialData - Données SSR (première page de photos)
 * @param {number} initialLimit - Nombre de photos par bloc (défini côté serveur)
 */
export default function GalleryPage({ initialData = {}, initialLimit = 10 }) {
  // Nombre de photos à charger/retirer à chaque action
  const loadOffset = initialLimit;

  /**
   * OFFSET : Position de départ pour charger les photos
   * Exemple avec initialLimit=10 :
   * - offset=0  → charge photos 0-9
   * - offset=10 → charge photos 10-19
   * - offset=20 → charge photos 20-29
   */
  const [offset, setOffset] = useState(0);

  /**
   * ALLPHOTOS : Toutes les photos actuellement VISIBLES par l'utilisateur
   * On accumule les photos au fur et à mesure des clics sur "Voir plus"
   */
  const [allPhotos, setAllPhotos] = useState(initialData.photos || []);

  /**
   * HOOK : Récupère les photos pour l'offset actuel
   * - data : Les nouvelles photos chargées
   * - isFetching : Indicateur de chargement
   * - prefetchNext : Fonction pour précharger la page suivante
   */
  const { data, isFetching, prefetchNext } = useGetGallery(
    offset === 0 ? initialData : null, // Utilise les données SSR uniquement au début
    loadOffset,
    offset,
  );

  // Métadonnées
  const totalPhotos = data?.totalPhotos || initialData.totalPhotos || 0;
  const hasMore = allPhotos.length < totalPhotos; // Y a-t-il encore des photos à charger ?
  const canShowLess = allPhotos.length > initialLimit; // Peut-on réduire le nombre de photos affichées ?

  /**
   * PREFETCH : Précharge automatiquement la page suivante
   * Dès qu'une page est affichée, on charge la suivante en arrière-plan
   * → Quand l'utilisateur clique sur "Voir plus", c'est instantané !
   */
  useEffect(() => {
    if (hasMore && !isFetching && prefetchNext) {
      prefetchNext();
    }
  }, [hasMore, isFetching, prefetchNext]);

  /**
   * ACCUMULATION : Ajoute les nouvelles photos à la liste visible
   *
   * Logique :
   * - Si offset=0 → On réinitialise (cas du "Voir moins" qui revient au début)
   * - Sinon → On ajoute les nouvelles photos SANS DOUBLONS (filtre par ID)
   */
  useEffect(() => {
    if (!data?.photos?.length) return;

    if (offset === 0) {
      // Reset complet (bouton "Voir moins" ramené au début)
      setAllPhotos(data.photos);
    } else {
      // Ajouter les nouvelles photos en évitant les doublons
      setAllPhotos((prev) => {
        const ids = new Set(prev.map((p) => p.id)); // IDs déjà présents
        const uniques = data.photos.filter((p) => !ids.has(p.id)); // Nouvelles photos uniquement
        return [...prev, ...uniques]; // Fusion
      });
    }
  }, [data?.photos, offset]);

  /**
   * VOIR PLUS : Charge le bloc de photos suivant
   * Incrémente l'offset de loadOffset (ex: 0 → 10 → 20 → 30...)
   */
  const handleLoadMore = () => setOffset((prev) => prev + loadOffset);

  /**
   * VOIR MOINS : Retire le dernier bloc de photos chargé
   * - Décrémente l'offset (ex: 30 → 20 → 10 → 0)
   * - Retire visuellement les dernières photos (slice)
   * - Ne descend jamais sous initialLimit photos
   */
  const handleShowLess = () => {
    setOffset((prev) => Math.max(0, prev - loadOffset));
    setAllPhotos((prev) =>
      prev.slice(0, Math.max(initialLimit, prev.length - loadOffset)),
    );
  };

  return (
    <Card>
      <h1>{data?.titreprincipal || initialData.titreprincipal}</h1>

      <section className="section">
        {/* key force le reset du carousel quand le nb de photos change */}
        <Carousel key={allPhotos.length} images={allPhotos} />

        {/* Affiche les contrôles si nécessaire */}
        {(hasMore || canShowLess) && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {/* Bouton "Voir plus" */}
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isFetching ? "Chargement…" : "Voir plus"}
                </button>
              )}

              {/* Bouton "Voir moins" */}
              {canShowLess && (
                <button
                  onClick={handleShowLess}
                  className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
                >
                  Voir moins
                </button>
              )}
            </div>

            {/* Compteur */}
            <span className="text-sm text-gray-600">
              {allPhotos.length} / {totalPhotos} photos
            </span>
          </div>
        )}
      </section>
    </Card>
  );
}
