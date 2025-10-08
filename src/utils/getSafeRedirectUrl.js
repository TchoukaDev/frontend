export function getSafeRedirectUrl(url, origin = process.env.NEXT_PUBLIC_URL) {
  if (!url || url === "null" || url === "undefined") return "/";

  try {
    const parsedUrl = new URL(url, origin);

    if (parsedUrl.origin !== origin) return "/";
    return parsedUrl.pathname + parsedUrl.search;
  } catch {
    return "/";
  }
}
