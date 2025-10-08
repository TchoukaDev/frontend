import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

/**
 * Middleware Next.js - S'exécute AVANT le rendu des pages
 *
 * @param {Request} request - Objet de requête Next.js
 *
 * Exemple de ce que contient request :
 * {
 *   url: "https://votre-site.com/competitions?page=2",
 *   nextUrl: {
 *     pathname: "/competitions",
 *     search: "?page=2",
 *     origin: "https://votre-site.com",
 *     href: "https://votre-site.com/competitions?page=2"
 *   },
 *   headers: { ... },
 *   cookies: { ... }
 * }
 */
export async function middleware(request) {
  /**
   * 📍 PATHNAME - Le chemin de l'URL sans le domaine ni les query params
   *
   * Exemples :
   * - URL complète : https://votre-site.com/competitions?page=2
   *   → pathname = "/competitions"
   *
   * - URL complète : https://votre-site.com/section-animateurs/formation
   *   → pathname = "/section-animateurs/formation"
   *
   * - URL complète : https://votre-site.com/login
   *   → pathname = "/login"
   */
  const { pathname } = request.nextUrl;

  console.log("\n========================================");
  console.log("🔍 MIDDLEWARE APPELÉ");
  console.log("📍 pathname:", pathname);
  console.log("🔑 NEXTAUTH_SECRET défini?", !!process.env.NEXTAUTH_SECRET);
  /**
   * 🎫 TOKEN - Informations de session de l'utilisateur (ou null si non connecté)
   *
   * Si connecté :
   * {
   *   id: "123",
   *   email: "user@example.com",
   *   role: "animateur",
   *   jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   *   exp: 1706702400
   * }
   *
   * Si NON connecté :
   * null
   */
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("🎫 Token:", token);
  console.log("========================================\n");
  // ═══════════════════════════════════════════════════════════
  // 🔒 PROTECTION DE /competitions (connexion requise)
  // ═══════════════════════════════════════════════════════════

  /**
   * Vérifie si l'URL commence par "/competitions"
   *
   * pathname.startsWith("/competitions") retourne true pour :
   * - "/competitions"
   * - "/competitions/message-test"
   * - "/competitions/anything"
   *
   * Mais false pour :
   * - "/infos"
   * - "/section-animateurs"
   */
  if (pathname.startsWith("/competitions")) {
    // Si l'utilisateur n'est PAS connecté (token = null)
    if (!token) {
      /**
       * 🔗 LOGIN URL - Construit l'URL de redirection vers /login
       *
       * new URL("/login", request.url) crée :
       * {
       *   pathname: "/login",
       *   origin: "https://votre-site.com",
       *   href: "https://votre-site.com/login",
       *   searchParams: {} (vide au départ)
       * }
       *
       * request.url contient l'URL complète actuelle
       * Exemples :
       * - "https://votre-site.com/competitions"
       * - "https://votre-site.com/competitions?page=2"
       */
      const loginUrl = new URL("/login", request.url);

      /**
       * 📌 CALLBACK URL - Ajoute le query param "callbackUrl"
       *
       * Avant : loginUrl.href = "https://votre-site.com/login"
       * Après  : loginUrl.href = "https://votre-site.com/login?callbackUrl=/competitions"
       *
       * pathname contient ici : "/competitions"
       *
       * Résultat dans la barre d'adresse :
       * https://votre-site.com/login?callbackUrl=/competitions
       */
      loginUrl.searchParams.set("callbackUrl", pathname);

      /**
       * ↪️ REDIRECTION - Redirige l'utilisateur vers la page de login
       *
       * L'utilisateur sera renvoyé vers :
       * https://votre-site.com/login?callbackUrl=/competitions
       *
       * Après connexion réussie, il sera redirigé vers /competitions
       */
      return NextResponse.redirect(loginUrl);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 🔐 PROTECTION DE /section-animateurs (connexion + rôle animateur)
  // ═══════════════════════════════════════════════════════════

  if (pathname.startsWith("/section-animateurs")) {
    // CAS 1 : Utilisateur non connecté
    if (!token) {
      /**
       * loginUrl sera par exemple :
       * https://votre-site.com/login?callbackUrl=/section-animateurs
       */
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    /**
     * 👤 USER ROLE - Extrait le rôle depuis le token
     *
     * Exemples :
     * - token.role = "animateur"  → Accès autorisé ✅
     * - token.role = "authenticated" → Accès refusé ❌
     * - token.role = null → Accès refusé ❌
     */
    const userRole = token?.role;

    // CAS 2 : Utilisateur connecté MAIS pas animateur
    if (userRole !== "animateur") {
      /**
       * 🚫 FORBIDDEN URL - Construit l'URL vers la page 403
       *
       * forbiddenUrl.href = "https://votre-site.com/403"
       *
       * Puis on ajoute le query param "from" :
       * forbiddenUrl.href = "https://votre-site.com/403?from=/section-animateurs"
       *
       * pathname contient ici : "/section-animateurs" ou "/section-animateurs/formation"
       */
      const forbiddenUrl = new URL("/403", request.url);

      /**
       * ⚠️ BUG ORIGINAL CORRIGÉ ICI !
       * Avant : loginUrl.searchParams.set("from", pathname); ❌
       * Après  : forbiddenUrl.searchParams.set("from", pathname); ✅
       */
      forbiddenUrl.searchParams.set("from", pathname);

      /**
       * ↪️ REDIRECTION vers page 403
       *
       * L'utilisateur sera renvoyé vers :
       * https://votre-site.com/403?from=/section-animateurs
       *
       * La page 403 pourra afficher :
       * "Vous avez tenté d'accéder à /section-animateurs"
       */
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 👤 REDIRECTION DES PAGES LOGIN/SIGNUP SI DÉJÀ CONNECTÉ
  // ═══════════════════════════════════════════════════════════

  /**
   * Si l'utilisateur est déjà connecté (token existe)
   * ET qu'il essaie d'accéder à /login ou /signup
   * → On le redirige vers la page d'accueil
   *
   * Exemples :
   * - User connecté visite /login → Redirigé vers /
   * - User connecté visite /signup → Redirigé vers /
   * - User NON connecté visite /login → Affiche la page de login (pas de redirection)
   */
  if ((pathname === "/login" || pathname === "/signup") && token) {
    /**
     * new URL("/", request.url) crée :
     * {
     *   pathname: "/",
     *   origin: "https://votre-site.com",
     *   href: "https://votre-site.com/"
     * }
     */
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * ✅ CONTINUER NORMALEMENT
   *
   * Si aucune des conditions ci-dessus n'est remplie,
   * le middleware laisse passer la requête vers la page demandée.
   *
   * Exemples de cas où on continue :
   * - User connecté visite /competitions → Continue ✅
   * - User animateur visite /section-animateurs → Continue ✅
   * - User visite /infos (page publique) → Continue ✅
   */
  return NextResponse.next();
}

/**
 * ⚙️ CONFIGURATION DU MIDDLEWARE
 *
 * Le middleware ne s'exécute QUE pour les routes listées dans matcher
 *
 * Exemples de ce qui est matché :
 * - "/competitions" ✅
 * - "/competitions/message-test" ✅ (grâce à :path*)
 * - "/section-animateurs" ✅
 * - "/section-animateurs/formation/secourisme" ✅ (grâce à :path*)
 * - "/login" ✅
 * - "/signup" ✅
 *
 * Ce qui n'est PAS matché (middleware ne s'exécute pas) :
 * - "/infos" ❌
 * - "/club" ❌
 * - "/" ❌
 * - "/api/auth/session" ❌
 */
export const config = {
  matcher: [
    "/competitions/:path*", // /competitions ET tout ce qui suit
    "/section-animateurs/:path*", // /section-animateurs ET tout ce qui suit
    "/login", // Seulement /login (pas /login/autre)
    "/signup", // Seulement /signup
  ],
};
