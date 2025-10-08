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
 
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  // 📊 Logs pour débogage en production
  if (!token) {
    console.log("❌ Middleware: Token null pour", pathname);
    console.log("🔑 Secret défini:", !!process.env.NEXTAUTH_SECRET);
    console.log("🌐 NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  }


   * Vérifie si l'URL commence par "/competitions"

  if (pathname.startsWith("/competitions")) {
    // Si l'utilisateur n'est PAS connecté (token = null)
    if (!token) {
      /**
       * new URL("/login", request.url) crée :
       * {
       *   pathname: "/login",
       *   origin: "https://votre-site.com",
       *   href: "https://votre-site.com/login",
       *   searchParams: {} (vide au départ)
       * }
       *
       * request.url contient l'URL complète actuelle

       */
      const loginUrl = new URL("/login", request.url);

      /**
       * 📌 CALLBACK URL - Ajoute le query param "callbackUrl"
       * Avant : loginUrl.href = "https://votre-site.com/login"
       * Après  : loginUrl.href = "https://votre-site.com/login?callbackUrl=/competitions"
       */
      loginUrl.searchParams.set("callbackUrl", pathname);

      /**
       * L'utilisateur sera renvoyé vers :
       * https://votre-site.com/login?callbackUrl=/competitions
       */
      return NextResponse.redirect(loginUrl);
    }
  }

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
   * ET qu'il essaie d'accéder à /login ou /signup
   * → On le redirige vers la page d'accueil
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
   * Si aucune des conditions ci-dessus n'est remplie, le middleware laisse passer la requête vers la page demandée.
   */
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/competitions/:path*", // /competitions ET tout ce qui suit
    "/section-animateurs/:path*", // /section-animateurs ET tout ce qui suit
    "/login", // Seulement /login (pas /login/autre)
    "/signup", // Seulement /signup
  ],
};
