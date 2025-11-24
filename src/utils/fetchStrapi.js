// /utils/fetchStrapi.js

export async function fetchStrapi(endpoint, revalidate = 300) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        // ✅ Utiliser le cache natif de fetch au lieu de unstable_cache
        next: {
          revalidate: revalidate,
          tags: [endpoint.split("?")[0]],
        },
      },
    );

    if (!response.ok) {
      console.error(`Erreur ${response.status} pour ${endpoint}`);
      return { data: [] };
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return { data: [] };
  }
}
