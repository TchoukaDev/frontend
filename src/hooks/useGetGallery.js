// hooks/useGetGallery.js
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetGallery(initialData, limit, offset) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["gallery", limit, offset],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${offset}`,
      );
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      return data;
    },
    initialData: offset === 0 ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const prefetchNext = () => {
    const nextOffset = offset + limit;

    // Vérifier si c'est déjà en cache
    const cached = queryClient.getQueryData(["gallery", limit, nextOffset]);
    if (cached) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ["gallery", limit, nextOffset],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${nextOffset}`,
        );
        if (!res.ok) throw new Error("Erreur");
        const data = await res.json();
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return { ...query, prefetchNext };
}
