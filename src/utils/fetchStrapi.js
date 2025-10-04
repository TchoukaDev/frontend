export async function fetchStrapi(endpoint, cache) {
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/${endpoint}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } },
      {
        next: { revalidate: cache },
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
