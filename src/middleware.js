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
  /*
   */
  const { pathname } = request.nextUrl;

  // ✅ Ne faire l'appel à getToken QUE si nécessaire
  const protectedRoutes = [
    "/competitions",
    "/section-animateurs",
    "/connexion",
    "/inscription",
    "/mot-de-passe-oublie",
    "/compte-bloque",
  ];

  const needsAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!needsAuth) {
    // ✅ Pas de vérification auth = pas de SSR forcé
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  // 🚫 NOUVELLE VÉRIFICATION : Bloquer l'utilisateur si son compte est bloqué
  // ⚠️ IMPORTANT : Cette vérification doit être AVANT toutes les autres
  if (token?.blocked && pathname !== "/compte-bloque") {
    const blockedUrl = new URL("/compte-bloque", request.url);
    return NextResponse.redirect(blockedUrl);
  }

  //  Vérifie si l'URL commence par "/competitions"

  if (pathname.startsWith("/competitions")) {
    // Si l'utilisateur n'est PAS connecté (token = null)
    if (!token) {
      /**
       * new URL("/connexion", request.url) crée :
       * {
       *   pathname: "/connexion",
       *   origin: "https://votre-site.com",
       *   href: "https://votre-site.com/connexion",
       *   searchParams: {} (vide au départ)
       * }
       *
       * request.url contient l'URL complète actuelle

       */
      const loginUrl = new URL("/connexion", request.url);

      /**
       * 📌 CALLBACK URL - Ajoute le query param "callbackUrl"
       * Avant : loginUrl.href = "https://votre-site.com/connexion"
       * Après  : loginUrl.href = "https://votre-site.com/connexion?callbackUrl=/competitions"
       */
      loginUrl.searchParams.set("callbackUrl", pathname);

      /**
       * L'utilisateur sera renvoyé vers :
       * https://votre-site.com/connexion?callbackUrl=/competitions
       */
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/section-animateurs")) {
    // CAS 1 : Utilisateur non connecté
    if (!token) {
      /**
       * loginUrl sera par exemple :
       * https://votre-site.com/connexion?callbackUrl=/section-animateurs
       */
      const loginUrl = new URL("/connexion", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = token?.role;

    // CAS 2 : Utilisateur connecté MAIS pas animateur
    if (userRole !== "animateur") {
      /**
       * forbiddenUrl.href = "https://votre-site.com/403"
       * Puis on ajoute le query param "from" :
       * forbiddenUrl.href = "https://votre-site.com/403?from=/section-animateurs"
       *
       */
      const forbiddenUrl = new URL("/403", request.url);

      forbiddenUrl.searchParams.set("from", pathname);

      /**
       * L'utilisateur sera renvoyé vers :
       * https://votre-site.com/403?from=/section-animateurs
       */
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  /**
   * Si l'utilisateur est déjà connecté (token existe)
   * ET qu'il essaie d'accéder à /connexion ou /inscription
   * → On le redirige vers la page d'accueil
   */
  if (
    (pathname === "/connexion" ||
      pathname === "/inscription" ||
      pathname === "/mot-de-passe-oublie") &&
    token
  ) {
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
   * Si aucune des conditions ci-dessus n'est remplie, le middleware laisse passer la requête vers la page demandée.
   */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/competitions/:path*", // /competitions ET tout ce qui suit
    "/section-animateurs/:path*", // /section-animateurs ET tout ce qui suit
    "/connexion", // Seulement /connexion (pas /connexion/autre)
    "/inscription", // Seulement /inscription
    "/mot-de-passe-oublie",
    "/compte-bloque",
  ],
};
