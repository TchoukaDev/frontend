// hooks/useGetGallery.js
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetGallery(initialData, limit, offset, dossier = "all") {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["gallery", limit, offset, dossier],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${offset}&dossier=${dossier}`,
      );
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      return data;
    },
    initialData: offset === 0 && dossier === "all" ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const prefetchNext = () => {
    const nextOffset = offset + limit;

    // Vérifier si c'est déjà en cache
    const cached = queryClient.getQueryData([
      "gallery",
      limit,
      nextOffset,
      dossier,
    ]);
    if (cached) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ["gallery", limit, nextOffset, dossier],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${nextOffset}&dossier=${dossier}`,
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
