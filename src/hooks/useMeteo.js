"use client";

import { useQuery } from "@tanstack/react-query";

// Fonction pour fetcher la météo depuis l'API route
async function fetchMeteo(ville) {
  // fallback sur "Biscarrosse" si ville vide
  if (!ville) ville = "Biscarrosse";

  // fetch vers l'API interne
  const res = await fetch(`/api/meteo?ville=${encodeURIComponent(ville)}`);

  // transformer la réponse en JSON
  const data = await res.json();

  // On renvoie toujours les données, même si elles contiennent error
  return data;
}

// Hook personnalisé
export default function useMeteo(ville = "Biscarrosse", initialData = null) {
  return useQuery({
    queryKey: ["meteo", ville], // clé unique pour cette ville
    queryFn: () => fetchMeteo(ville),

    initialData, // données initiales venant d'un server component
    keepPreviousData: true, // garder l'ancienne météo si le fetch échoue

    // Stale / refetch
    staleTime: 5 * 60 * 1000, // données fraîches pendant 5min
    refetchInterval: 10 * 60 * 1000, // refresh toutes les 10min
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
