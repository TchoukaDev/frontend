import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetArticlesPage(
  slug,
  limit = 5,
  page = 1,
  initialData = null,
) {
  return useQuery({
    queryKey: ["articlesPage", slug, limit, page],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/articles/${slug}?page=${page}&limit=${limit}`,
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
    refetchInterval: page === 1 ? 5 * 60 * 1000 : false,
    // Polling uniquement sur la première page
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!slug && limit != null && page != null,
  });
}
