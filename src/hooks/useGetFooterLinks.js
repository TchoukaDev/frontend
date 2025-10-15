import { fetchStrapi } from "@/utils/fetchStrapi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetFooterLink(initialData = null) {
  return useQuery({
    queryKey: ["footerLinks"],
    queryFn: async () => {
      const data = await fetchStrapi("pied-de-page");

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    }, // Données initiales (SSR)
    initialData,

    // Cache et fraîcheur
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 15 * 60 * 1000, // 15 min

    // Refetch automatique
    refetchInterval: 5 * 60 * 1000, // 5 min
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,

    // Retry en cas d'erreur
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
