import { keepPreviousData, useQuery } from "@tanstack/react-query";

/**
 * Hook pour fetcher une page depuis l'API Strapi
 * @param {string} endpoint - Endpoint à fetcher (ex: "articles", "products")
 * @param {object|null} initialData - Données SSR (optionnel)
 * @returns {UseQueryResult}
 */
export function useGetPage(endpoint, initialData = null) {
  return useQuery({
    queryKey: ["pages", endpoint],

    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/strapi/${endpoint}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.error || `Erreur ${response.status}: ${response.statusText}`,
        );
      }

      return data;
    },

    // Données initiales (SSR)
    initialData,

    // Cache et fraîcheur
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 15 * 60 * 1000, // 15 min

    // Refetch automatique
    refetchInterval: 5 * 60 * 1000, // 5 min
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

    // Désactive si pas d'endpoint
    enabled: !!endpoint,

    // Retry en cas d'erreur
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    /* attemptIndex	2^attemptIndex	1000 × 2^attemptIndex	  Math.min(..., 30000)	    Délai final
            0	          1	                      1000	          min(1000, 30000)	  1 seconde
            1	          2	                      2000	          min(2000, 30000)	  2 secondes
            2	          4	                      4000	          min(4000, 30000)	  4 secondes
            3	          8	                      8000	          min(8000, 30000)	  8 secondes
            4	          16	                    16000	          min(16000, 30000)	  16 secondes
            5	          32	                    32000	          min(32000, 30000)	  30 secondes ⬅️ Plafonné
            6	          64	                    64000	          min(64000, 30000)	  30 secondes ⬅️ Plafonné
            7	          128	                    128000	        min(128000, 30000)	30 secondes ⬅️ Plafonné
*/
  });
}
