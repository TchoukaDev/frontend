// /utils/fetchStrapi.js
export async function fetchStrapi(endpoint, revalidate = 300) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/${endpoint}`,
      {
        // ✅ UN SEUL OBJET avec toutes les options
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: {
          revalidate: revalidate,
        },
      },
    );

    if (!response.ok) {
      console.error(response.status, response.statusText);
      return {};
    }

    const data = await response.json();
    return data || {};
  } catch (e) {
    console.error(e.message);
    return {};
  }
}
