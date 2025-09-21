// Import de la fonction pour récupérer le token JWT de NextAuth
import { getToken } from "next-auth/jwt";
// Import de NextResponse pour gérer les réponses du middleware
import { NextResponse } from "next/server";

// Fonction middleware qui s'exécute AVANT chaque requête correspondant au matcher
export default async function middleware(request) {
  // 🔍 ÉTAPE 1: Récupération du token JWT depuis les cookies de la requête
  const token = await getToken({
    req: request, // L'objet requête contenant les cookies
    secret: process.env.NEXTAUTH_SECRET, // Clé secrète pour décoder le JWT
  });

  // 🚪 ÉTAPE 2: Vérification d'authentification
  // On utilise l'opérateur optionnel (?.) pour éviter les erreurs si token est null
  if (!token?.email) {
    // 🔄 ÉTAPE 3: Création de l'URL de redirection
    const url = request.nextUrl.clone(); // Clone l'URL actuelle
    url.pathname = "/login"; // Change le chemin vers /login

    // 🚫 ÉTAPE 4: Redirection vers la page de login
    return NextResponse.redirect(url);
  }

  // ✅ ÉTAPE 5: Autoriser l'accès si tout est OK
  // NextResponse.next() signifie "continuer vers la page demandée"
  return NextResponse.next();
}

// 🎯 CONFIGURATION: Définit sur quelles routes ce middleware s'applique
export const config = {
  matcher: ["/competitions/:path*"], // S'applique sur /competitions et tous ses sous-chemins
};
