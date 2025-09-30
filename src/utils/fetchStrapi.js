export async function fetchStrapi(endpoint, cache) {
  try {
    const response = await fetch(`${process.env.STRAPI_API}/api/${endpoint}`, {
      next: { revalidate: cache },
    });

    if (!response.ok) {
      console.error(response.status, response.statusText);
      return {}; // ✅ Changez juste ça : return null au lieu de throw
    }

    const data = await response.json();
    return data || {};
  } catch (e) {
    console.error(e.message);
    return {};
  }
}
