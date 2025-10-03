"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

/**
 * ItemsPerPageSelector
 *
 * Composant pour changer le nombre d'articles affichés par page.
 * Réinitialise automatiquement à la page 1 lors du changement.
 *
 * Props :
 * @param {number} currentLimit – limite actuelle d'éléments/page
 */
export default function ItemsPerPageSelector({ currentLimit }) {
  // Hooks Next.js pour navigation et lecture d'URL
  const router = useRouter();
  const pathname = usePathname(); // ex: "/infos"
  const searchParams = useSearchParams(); // URLSearchParams instance

  // useTransition pour afficher un spinner pendant le changement
  const [isPending, startTransition] = useTransition();

  // Options disponibles dans le select
  const limitOptions = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
  ];

  /**
   * Construit l'URL pour la nouvelle limite.
   * Préserve les autres params (ex: search, filters) sauf page (remis à 1).
   *
   * @param {number} newLimit – nouvelle limite d'éléments
   * @returns {string} URL complète avec les nouveaux params
   */
  const buildLimitUrl = (newLimit) => {
    // Clone les params existants
    const params = new URLSearchParams(searchParams.toString());

    // Reset à page 1 (évite d'arriver sur une page vide)
    params.set("page", "1");

    // Mise à jour de la limite
    params.set("limit", newLimit.toString());

    return `${pathname}?${params.toString()}`;
  };

  /**
   * Gère le changement de limite via le <select>.
   * Lance une transition pour afficher le spinner.
   *
   * @param {Event} e – événement du select
   */
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);

    // Évite les appels inutiles si même valeur
    if (newLimit === currentLimit) return;

    // Démarre la transition (isPending = true)
    startTransition(() => {
      // Navigation avec la nouvelle URL
      router.replace(buildLimitUrl(newLimit), {
        scroll: false, // ne pas scroller en haut
      });
    });
  };

  return (
    <div className="flex items-center gap-3">
      {/* Label accessible */}
      <label
        htmlFor="itemsPerPage"
        className="text-sm font-medium text-gray-700"
      >
        Articles par page :
      </label>

      {/* Container du select avec position relative pour le spinner */}
      <div className="relative">
        <select
          id="itemsPerPage"
          value={currentLimit}
          onChange={handleLimitChange}
          disabled={isPending} // désactive pendant le chargement
          className="border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     cursor-pointer min-w-[70px] appearance-none bg-sand"
          aria-label="Sélectionner le nombre d'articles par page"
        >
          {limitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Icône dynamique : spinner pendant chargement, s flèche */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          {isPending ? (
            <ClipLoader size={16} color="#3b82f6" />
          ) : (
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
