import { slugToApiCollection } from "@/libs/slugToApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetArticle(slug, articleSlug, initialData = null) {
  const apiCollection = slugToApiCollection(slug);
  return useQuery({
    queryKey: ["article", apiCollection, articleSlug],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/articles/${apiCollectiong}/${articleSlug}`,
      );
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.error || `Erreur ${response.status}: ${response.statusText}`,
        );
      }

      return data;
    },
    initialData,
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000 * 60,
    gcTime: 15 * 1000 * 60,
    refetchOnReconnect: true,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!slug && !!articleSlug,
  });
}
