// app/infos/components/ItemsPerPageSelector.js
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

/**
 * Client Component pour sélectionner le nombre d'articles par page
 * Gère le changement de limite avec remise à zéro de la pagination
 *
 * @param {Object} props
 * @param {number} props.currentLimit - Limite actuelle d'articles par page
 * @param {number} props.currentPage - Page actuelle (pour construire l'URL)
 */
export default function ItemsPerPageSelector({ currentLimit, currentPage }) {
  const router = useRouter();

  // Hook pour gérer les transitions
  const [isPending, startTransition] = useTransition();
  const [pendingLimit, setPendingLimit] = useState(null);

  // Options disponibles pour le nombre d'articles par page
  const limitOptions = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];

  /**
   * Gère le changement du nombre d'articles par page
   * Remet automatiquement à la page 1 pour éviter les pages vides
   *
   * @param {number} newLimit - Nouvelle limite d'articles par page
   */
  const handleLimitChange = (newLimit) => {
    // Évite les appels inutiles
    if (newLimit === currentLimit) return;

    // État de chargement optimiste
    setPendingLimit(newLimit);

    startTransition(() => {
      // Construction de l'URL - toujours remettre à la page 1
      const params = new URLSearchParams();
      params.set("page", "1"); // Reset à la page 1

      // N'ajouter le paramètre limit que s'il n'est pas la valeur par défaut

      params.set("limit", newLimit.toString());

      // Navigation avec nouveaux paramètres
      router.push(`/infos?${params.toString()}`);

      // Scroll vers le haut car on change potentiellement beaucoup de contenu
    });
  };

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="itemsPerPage"
        className="text-sm font-medium text-gray-700"
      >
        Articles par page :
      </label>

      <div className="relative">
        <select
          id="itemsPerPage"
          value={pendingLimit || currentLimit}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
          disabled={isPending}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px] appearance-none bg-white"
          aria-label="Sélectionner le nombre d'articles par page"
        >
          {limitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Icône de chargement ou flèche */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isPending ? (
            <span className="animate-spin text-blue-600">⏳</span>
          ) : (
            <span className="text-gray-400">▼</span>
          )}
        </div>
      </div>

      {/* Indicateur de changement en cours */}
      {isPending && (
        <span className=" flex items-center gap-1">
          <span className="animate-spin">⏳</span>
        </span>
      )}
    </div>
  );
}
