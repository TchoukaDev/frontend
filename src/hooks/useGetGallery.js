// hooks/useGetGallery.js
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetGallery(
  initialData,
  limit,
  dossier = "all",
  loadStep = 10,
) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["gallery", limit, dossier],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&dossier=${dossier}`,
      );
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      return data;
    },
    initialData: limit === 10 && dossier === "all" ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const prefetchNext = () => {
    const nextLimit = limit + loadStep;

    // Vérifier si c'est déjà en cache
    const cached = queryClient.getQueryData(["gallery", nextLimit, dossier]);
    if (cached) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: ["gallery", nextLimit, dossier],
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${nextLimit}&dossier=${dossier}`,
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
