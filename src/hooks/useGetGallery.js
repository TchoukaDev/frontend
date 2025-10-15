// hooks/useGetGallery.js
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetGallery(initialData, limit, offset) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["gallery", limit, offset],
    queryFn: async () => {
      console.log("📡 FETCH PRINCIPALE - offset:", offset);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${offset}`,
      );
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      console.log(
        "✅ Data reçue offset",
        offset,
        ":",
        data.photos?.length,
        "photos",
      );
      return data;
    },
    initialData: offset === 0 ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const prefetchNext = () => {
    const nextOffset = offset + limit;
    console.log("🎯 prefetchNext appelé - nextOffset:", nextOffset);

    // Vérifier si c'est déjà en cache
    const cached = queryClient.getQueryData(["gallery", limit, nextOffset]);
    if (cached) {
      console.log("💾 Déjà en cache, pas de prefetch");
      return;
    }

    console.log("🚀 Lancement du PREFETCH pour offset:", nextOffset);
    queryClient.prefetchQuery({
      queryKey: ["gallery", limit, nextOffset],
      queryFn: async () => {
        console.log("📡 PREFETCH FETCH - offset:", nextOffset);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/strapi/galerie?limit=${limit}&offset=${nextOffset}`,
        );
        if (!res.ok) throw new Error("Erreur");
        const data = await res.json();
        console.log(
          "✅ Prefetch terminé offset",
          nextOffset,
          ":",
          data.photos?.length,
          "photos",
        );
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return { ...query, prefetchNext };
}
