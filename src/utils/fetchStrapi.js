// /utils/fetchStrapi.js
import { unstable_cache } from "next/cache";

async function fetchStrapiUncached(endpoint) {
  const response = await fetch(
    `${process.env.STRAPI_API_URL}/api/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      // ⚠️ Pas de cache ici, c'est unstable_cache qui gère
    },
  );

  if (!response.ok) {
    console.error(`Erreur ${response.status}`);
  }

  return response.json();
}

export async function fetchStrapi(endpoint, revalidate = 300) {
  // ✅ Créer une fonction cachée pour CET endpoint spécifique
  const getCachedData = unstable_cache(
    async () => fetchStrapiUncached(endpoint),
    [endpoint], // Cache key
    {
      revalidate: revalidate,
      tags: [endpoint.split("?")[0]],
    },
  );

  return getCachedData();
}
