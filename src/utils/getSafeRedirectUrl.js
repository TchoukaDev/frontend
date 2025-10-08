/**
 * Valide et sécurise une URL de redirection
 *
 * Protège contre les attaques "Open Redirect" en s'assurant que
 * l'URL reste sur le même domaine (pas de redirection externe)
 *
 * @param {string} url - URL à valider (peut être null, undefined, ou invalide)
 * @returns {string} URL sécurisée ou '/' par défaut
 *
 * @example
 * getSafeRedirectUrl('/competitions') → '/competitions' ✅
 * getSafeRedirectUrl('https://evil.com') → '/' ❌ (bloqué)
 * getSafeRedirectUrl(null) → '/' ❌
 */
export function getSafeRedirectUrl(url) {
  // 🚫 CAS 1 : URL vide, null, undefined, ou strings 'null'/'undefined'
  if (!url || url === "null" || url === "undefined") {
    console.warn("⚠️ URL vide ou invalide, redirection vers /");
    return "/";
  }

  try {
    // 🔍 CAS 2 : Parser l'URL pour vérifier son origine
    // Si l'URL est relative (/competitions), on ajoute l'origine actuelle
    // Si l'URL est absolue (https://...), on garde url telle quelle
    const parsedUrl = new URL(url, window.location.origin);

    // 🛡️ VÉRIFICATION DE SÉCURITÉ : L'origine doit correspondre
    if (parsedUrl.origin !== window.location.origin) {
      console.warn(`🚫 Tentative de redirection externe bloquée: ${url}`);
      return "/";
    }

    // ✅ URL sécurisée : on retourne le chemin + query params
    return parsedUrl.pathname + parsedUrl.search;
  } catch (error) {
    // 🚫 CAS 3 : URL malformée (erreur de parsing)
    console.error("❌ URL invalide:", url, error);
    return "/";
  }
}
