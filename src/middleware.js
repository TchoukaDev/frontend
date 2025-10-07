import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // 🔒 Route nécessitant une connexion simple
  if (pathname.startsWith("/competitions")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // callbackUrl pour revenir à la page après connexion
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 🔐 Route nécessitant le rôle "animateur"
  if (pathname.startsWith("/section-animateurs")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = token?.role;
    if (userRole !== "animateur") {
      const forbiddenUrl = new URL("/403", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // 👤 Rediriger /login et /signup si déjà connecté
  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/competitions/:path*",
    "/section-animateurs/:path*",
    "/login",
    "/signup",
  ],
};
