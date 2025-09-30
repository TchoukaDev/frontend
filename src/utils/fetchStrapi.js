// utils/fetchStrapi.js
export async function fetchStrapi(endpoint, cache) {
  try {
    const response = await fetch(`${process.env.STRAPI_API}/api/${endpoint}`, {
      next: { revalidate: cache },
    });

    if (!response.ok) {
      console.log(`Strapi ${endpoint}: ${response.status}`);
      return {}; // ✅ Structure Strapi vide
    }

    const data = await response.json();
    return data || { data: {} };
  } catch (error) {
    console.log(`Fetch error: ${error.message}`);
    return {}; // ✅ Structure Strapi vide
  }
}
