/**
 * Génère l'URL complète d'une image/fichier Strapi
 * Fonctionne en dev ET prod, avec Cloudinary ET images locales
 */
export const getImageUrl = (imageData) => {
  // Si pas de données ou pas d'URL
  if (!imageData?.url) {
    return null;
  }

  const url = imageData.url;

  // Si l'URL est déjà complète (Cloudinary en prod)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Si l'URL est relative (images locales en dev)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return `${baseUrl}${url}`;
};
