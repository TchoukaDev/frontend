"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Fonction pour fetcher la météo depuis l'API route
async function fetchMeteo(ville) {
  // fallback sur "Biscarrosse" si ville vide

  // fetch vers l'API interne
  const res = await fetch(`/api/meteo?ville=${encodeURIComponent(ville)}`);

  // transformer la réponse en JSON
  const data = await res.json();

  // ✅ Si erreur dans la réponse, throw
  if (!res.ok || data.error) {
    throw new Error(data.error || `Erreur ${res.status}`);
  }

  // On renvoie toujours les données, même si elles contiennent error
  return data;
}

// Hook personnalisé
export default function useMeteo(ville = "Biscarrosse", initialData = null) {
  // Protège contre "", null, undefined, false, 0
  const normalizedVille = ville || "Biscarrosse";
  return useQuery({
    queryKey: ["meteo", normalizedVille], // clé unique pour cette ville
    queryFn: () => fetchMeteo(normalizedVille),

    initialData, // données initiales venant d'un server component
    placeholderData: keepPreviousData, // garder l'ancienne météo si le fetch échoue

    // Stale / refetch
    staleTime: 5 * 60 * 1000, // données fraîches pendant 5 min
    refetchInterval: 5 * 60 * 1000, // refresh toutes les 5min
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,

    // Retry automatique
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Cache
    gcTime: 15 * 60 * 1000, // garder en mémoire 15min après dernière utilisation
  });
}
