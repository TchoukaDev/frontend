"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

/**
 * PaginationControls
 *
 * Composant de pagination optimisé avec <Link> Next.js :
 * - Prefetch automatique au survol
 * - Navigation SPA sans rechargement
 * - scroll={false} pour préserver la position scroll
 * - Spinner global pendant la transition
 *
 * Props :
 * @param {number} currentPage   – page active (1-based)
 * @param {number} totalPages    – nombre total de pages
 * @param {number} itemsPerPage  – nb. d’éléments par page (pour l’URL)
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
}) {
  // Hooks Next.js pour lire l’URL et les params
  const pathname = usePathname(); // ex: "/infos"
  const searchParams = useSearchParams(); // URLSearchParams instance

  // useTransition pour détecter quand une navigation est en cours
  const [isPending, startTransition] = useTransition();

  /**
   * Construit l’URL de pagination pour une page donnée.
   * Préserve tous les autres params de l’URL.
   */
  const buildPageUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    params.set("limit", itemsPerPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  /**
   * Calcule les numéros de pages à afficher (max 3 boutons dynamiques).
   * - Si totalPages ≤ 3 : affiche [1…totalPages]
   * - Si currentPage ≤ 2 : affiche [1,2,3]
   * - Si currentPage ≥ totalPages-1 : affiche [last-2,last-1,last]
   * - Sinon : affiche [currentPage-1, currentPage, currentPage+1]
   */
  const getPageNumbers = () => {
    const maxButtons = 3;

    // cas 1 : peu de pages → toutes
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // cas 2 : début
    if (currentPage <= 2) {
      return [1, 2, 3];
    }
    // cas 3 : fin
    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    // cas 4 : milieu
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  /**
   * Doit-on afficher "…" avant les numéros ?
   * Vrai si on a sauté la page 1 (page 1 non dans getPageNumbers).
   */
  const shouldShowStartEllipsis = () => {
    const nums = getPageNumbers();
    return totalPages > 3 && currentPage > 2 && !nums.includes(1);
  };

  /**
   * Doit-on afficher "…" après les numéros ?
   * Vrai si on a sauté la dernière page.
   */
  const shouldShowEndEllipsis = () => {
    const nums = getPageNumbers();
    return (
      totalPages > 3 &&
      currentPage < totalPages - 1 &&
      !nums.includes(totalPages)
    );
  };

  // Liste des numéros dynamiques à afficher
  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="mt-8 pt-6 border-t border-gray-200"
      aria-label="Navigation de pagination"
      role="navigation"
    >
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-2">
          {/* ⬅️ BOUTON « Précédent » */}
          <Link
            href={buildPageUrl(currentPage - 1)}
            scroll={false} // ne pas scroll en haut
            aria-label="Page précédente"
            aria-disabled={currentPage === 1}
            className={`btn p-2 transition-opacity ${
              currentPage === 1 || isPending
                ? "pointer-events-none opacity-40 cursor-default"
                : "hover:bg-blue3/80"
            }`}
            onClick={(e) => {
              // Empêche la nav si déjà à la page 1
              if (currentPage === 1) {
                e.preventDefault();
              } else {
                // Démarre la transition pour afficher le spinner global
                startTransition(() => {});
              }
            }}
          >
            Précédent
          </Link>

          {/* NUMÉROS DE PAGES + ELLIPSES */}
          <div className="flex items-center gap-1 mx-4">
            {/* Ellipse début */}
            {shouldShowStartEllipsis() && (
              <>
                <Link
                  href={buildPageUrl(1)}
                  scroll={false}
                  aria-label="Aller à la page 1"
                  className="px-3 py-2 rounded-lg hover:text-blue-700 text-blue3 transition-all"
                  onClick={() => startTransition(() => {})}
                >
                  1
                </Link>
                <span
                  className="px-2 text-blue3 select-none"
                  aria-hidden="true"
                >
                  …
                </span>
              </>
            )}

            {/* Boutons pages dynamiques */}
            {pageNumbers.map((pageNum) => {
              const isCurrent = pageNum === currentPage;
              return isCurrent ? (
                // Page active : non cliquable
                <span
                  key={pageNum}
                  className="px-3 py-2 rounded-lg bg-blue3 text-white font-semibold shadow-md cursor-default select-none"
                  aria-current="page"
                  aria-label={`Page ${pageNum}`}
                >
                  {pageNum}
                </span>
              ) : (
                // Autres pages : Link cliquable
                <Link
                  key={pageNum}
                  href={buildPageUrl(pageNum)}
                  scroll={false}
                  aria-label={`Aller à la page ${pageNum}`}
                  className="px-3 py-2 rounded-lg text-blue3 hover:text-blue-700 cursor-pointer transition-all"
                  onClick={() => startTransition(() => {})}
                >
                  {pageNum}
                </Link>
              );
            })}

            {/* Ellipse fin */}
            {shouldShowEndEllipsis() && (
              <>
                <span
                  className="px-2 text-blue3 select-none"
                  aria-hidden="true"
                >
                  …
                </span>
                <Link
                  href={buildPageUrl(totalPages)}
                  scroll={false}
                  aria-label={`Aller à la page ${totalPages}`}
                  className="px-3 py-2 rounded-lg hover:text-blue-700 text-blue3 transition-all"
                  onClick={() => startTransition(() => {})}
                >
                  {totalPages}
                </Link>
              </>
            )}
          </div>

          {/* ➡️ BOUTON « Suivant » */}
          <Link
            href={buildPageUrl(currentPage + 1)}
            scroll={false}
            aria-label="Page suivante"
            aria-disabled={currentPage === totalPages}
            className={`btn p-2 transition-opacity ${
              currentPage === totalPages || isPending
                ? "pointer-events-none opacity-40 cursor-default"
                : "hover:bg-blue3/80"
            }`}
            onClick={(e) => {
              if (currentPage === totalPages) {
                e.preventDefault();
              } else {
                startTransition(() => {});
              }
            }}
          >
            Suivant
          </Link>
        </div>
      </div>

      {/* INFORMATION ET SPINNER GLOBAL */}
      <div className="flex justify-center gap-2 items-center mt-4 text-xs text-gray-600">
        {/* Texte de position */}
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        {/* Spinner affiché dès qu’une transition est en cours */}
        {isPending && (
          <span className="text-blue3 flex items-center" role="status">
            <ClipLoader size={20} color="#3b82f6" />
            <span className="sr-only">Chargement en cours...</span>
          </span>
        )}
      </div>
    </nav>
  );
}
