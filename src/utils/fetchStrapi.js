export async function fetchStrapi(endpoint, cache) {
  const response = await fetch(`${process.env.STRAPI_API}/api/${endpoint}`, {
    next: { revalidate: cache },
  });

  if (!response.ok) {
    console.error(response.status, response.statusText);
    return null;
  }

  const data = await response.json();

  return data || {};
}
