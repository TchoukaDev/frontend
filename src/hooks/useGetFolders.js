import { useQuery } from "@tanstack/react-query";

export function useGetFolders() {
  return useQuery({
    queryKey: ["dossiers"],
    queryFn: async () => {
      const res = await fetch(`/api/strapi/galerie/dossiers`);
      if (!res.ok) throw new Error("Erreur");
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
