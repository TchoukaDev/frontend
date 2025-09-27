"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button/Button";

/**
 * Composant de pagination avec navigation fluide
 * Permet de naviguer entre les pages d'articles avec des contrôles interactifs
 *
 * @param {number} currentPage - La page actuellement affichée (commence à 1)
 * @param {number} totalPages - Le nombre total de pages disponibles
 * @param {number} itemsPerPage - Le nombre d'articles affichés par page
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
}) {
  const router = useRouter();

  // Hook React pour gérer les transitions avec état de chargement automatique
  const [isPending, startTransition] = useTransition();

  // État local pour savoir quelle page spécifique est en cours de chargement
  const [pendingPage, setPendingPage] = useState(null);

  /**
   * Quand isPending passe à false (fin de transition), on remet pendingPage à null
   * Cela évite que les spinners restent affichés indéfiniment
   */
  useEffect(() => {
    if (!isPending) {
      setPendingPage(null);
    }
  }, [isPending]);

  /**
   * Fonction principale pour changer de page
   * Gère la validation, l'état de chargement et la navigation
   *
   * @param {number} newPage - Le numéro de la nouvelle page à charger
   */
  const handlePageChange = (newPage) => {
    // Validation : éviter les pages invalides et les clics sur la page courante
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }

    // On mémorise quelle page va être chargée pour afficher le bon spinner
    setPendingPage(newPage);

    // startTransition enrobe les changements d'état qui peuvent causer un re-render
    // Cela permet à React de différer la mise à jour si nécessaire pour garder l'UI réactive
    startTransition(() => {
      // Construction de l'URL avec les paramètres de pagination
      const params = new URLSearchParams();
      params.set("page", newPage.toString());

      // N'ajouter le paramètre limit que s'il n'est pas la valeur par défaut (5)
      // Cela garde l'URL plus propre

      params.set("limit", itemsPerPage.toString());

      // Navigation vers la nouvelle URL (va déclencher un re-render du Server Component)
      router.push(`/infos?${params.toString()}`);
    });
  };

  /**
   * Détermine quels numéros de pages afficher dans la pagination
   * Logique complexe pour gérer l'affichage de 5 pages maximum avec pagination intelligente
   *
   * @returns {Array<number>} Tableau des numéros de pages à afficher
   */
  const getPageNumbers = () => {
    const maxPages = 3; // Maximum de boutons de pages à afficher

    // Si le total des pages est inférieur ou égal à 3, afficher toutes les pages
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Si on est dans les 2 premières pages, afficher 1,2,3,4,5
    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    // Si on est dans les 3 dernières pages, afficher les 3 dernières
    if (currentPage >= totalPages - 1) {
      return Array.from({ length: 3 }, (_, i) => totalPages - 2 + i);
    }

    // Au milieu : afficher la page courante ± 2 pages
    return Array.from({ length: 3 }, (_, i) => currentPage - 1 + i);
  };

  /**
   * Détermine si l'ellipse de début (avant les numéros) doit être affichée
   * L'ellipse s'affiche quand il y a des pages non visibles au début
   *
   * @returns {boolean} true si l'ellipse de début doit être affichée
   */
  const shouldShowStartEllipsis = () => {
    const pageNumbers = getPageNumbers();
    return (
      totalPages > 3 && // Il faut plus de 5 pages au total
      currentPage > 2 && // On doit être après la page 3
      !pageNumbers.includes(1) // La page 1 ne doit pas déjà être dans la liste
    );
  };

  /**
   * Détermine si l'ellipse de fin (après les numéros) doit être affichée
   * L'ellipse s'affiche quand il y a des pages non visibles à la fin
   *
   * @returns {boolean} true si l'ellipse de fin doit être affichée
   */
  const shouldShowEndEllipsis = () => {
    const pageNumbers = getPageNumbers();
    return (
      totalPages > 3 && // Il faut plus de 5 pages au total
      currentPage < totalPages - 1 && // On doit être avant l'avant-dernière page
      !pageNumbers.includes(totalPages) // La dernière page ne doit pas déjà être dans la liste
    );
  };

  /**
   * Vérifie si une page spécifique est en cours de chargement
   * Utilisé pour afficher les spinners sur les bons boutons
   *
   * @param {number} pageNum - Le numéro de page à vérifier
   * @returns {boolean} true si cette page est en cours de chargement
   */

  // Récupération de la liste des numéros de pages à afficher
  const pageNumbers = getPageNumbers();

  return (
    // Élément nav sémantique avec ARIA pour l'accessibilité
    <nav
      className="mt-8 pt-6 border-t border-gray-200"
      aria-label="Navigation de pagination"
    >
      {/* Conteneur principal centré */}
      <div className="flex justify-center items-center">
        {/* Conteneur des contrôles de pagination */}
        <div className="flex items-center gap-2">
          {/* Bouton page précédente */}
          <button
            className="btn p-2"
            onClick={() => handlePageChange(currentPage - 1)}
            // Désactivé si on est sur la première page ou pendant le chargement
            disabled={currentPage === 1 || isPending}
            aria-label="Page précédente"
          >
            Précédent
          </button>

          {/* Conteneur des numéros de pages avec ellipses */}
          <div className="flex items-center gap-1 mx-4">
            {/* Section ellipse de début + bouton page 1 */}
            {shouldShowStartEllipsis() && (
              <>
                {/* Bouton pour aller directement à la page 1 */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={isPending}
                  className=" hover:cursor-pointer hover:font-semibold text-blue3 transition-all "
                  aria-label="Aller à la page 1"
                >
                  {1}
                </button>
                {/* Ellipse visuelle pour indiquer des pages manquantes */}
                <span className="px-2 text-blue3">…</span>
              </>
            )}

            {/* Boucle sur les numéros de pages principaux calculés */}
            {pageNumbers.map((pageNum) => {
              // Détermine si ce numéro correspond à la page actuelle
              const isCurrentPage = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  // Désactivé pendant le chargement ou si c'est la page courante
                  disabled={isPending || isCurrentPage}
                  // Styles conditionnels : page actuelle en bleu, autres avec bordure
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isCurrentPage
                      ? "bg-blue3 text-white font-semibold shadow-md "
                      : " text-blue3 hover:font-semibold cursor-pointer"
                  } disabled:opacity-50 flex items-center justify-center ]`}
                  aria-label={`Aller à la page ${pageNum}`}
                  // Indication ARIA pour la page courante
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {/* Affichage simple du numéro */}
                  {pageNum}
                </button>
              );
            })}

            {/* Section ellipse de fin + bouton dernière page */}
            {shouldShowEndEllipsis() && (
              <>
                {/* Ellipse visuelle pour indiquer des pages manquantes */}
                <span className="px-2 text-blue3">…</span>
                {/* Bouton pour aller directement à la dernière page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={isPending}
                  className="hover:cursor-pointer hover:font-semibold text-blue3 transition-all "
                  aria-label={`Aller à la page ${totalPages}`}
                >
                  {/* Pas de spinner ici car vous l'avez retiré */}
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Bouton page suivante */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            // Désactivé si on est sur la dernière page ou pendant le chargement
            disabled={currentPage === totalPages || isPending}
            className="btn p-2"
            aria-label="Page suivante"
          >
            {/* Texte simple sans spinner car vous l'avez retiré */}
            Suivant
          </button>
        </div>
      </div>

      {/* Section d'informations sur la pagination */}
      <div className="text-center mt-4 text-xs text-gray-600">
        {/* Affichage de la position actuelle */}
        Page {currentPage} sur {totalPages}
        {/* Indicateur de chargement global avec le ClipLoader que vous avez choisi */}
        {isPending && (
          <span className="ml-2 text-blue-600">
            {" "}
            <ClipLoader size={20} color="blue2" />
          </span>
        )}
      </div>
    </nav>
  );
}
