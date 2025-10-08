// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        autoLogin: { label: "Auto Login", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 1. Authentification Strapi
          const loginResponse = await fetch(
            `${process.env.STRAPI_API_URL}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const loginData = await loginResponse.json();

          if (!loginResponse.ok || !loginData.jwt) {
            console.error("❌ Login failed:", loginData);
            return null;
          }

          // 2. Récupérer les informations complètes avec le rôle
          const userDetailsResponse = await fetch(
            `${process.env.STRAPI_API_URL}/api/users/${loginData.user.id}?populate=role`,
            {
              headers: {
                Authorization: `Bearer ${loginData.jwt}`,
              },
            },
          );

          const userDetailsData = await userDetailsResponse.json();

          // Si erreur, renvoyer l'user sans le role
          if (!userDetailsResponse.ok) {
            console.error("❌ Failed to fetch user details:", userDetailsData);
            return {
              id: loginData.user.id,
              email: loginData.user.email,
              telephone: loginData.user.telephone || null,
              name: loginData.user.name || null,
              firstname: loginData.user.firstname || null,
              blocked: loginData.blocked || false,
              jwt: loginData.jwt,
              role: null,
              roleName: null,
              // 🔑 AUTOLOGIN - Converti de string "true"/"false" en boolean
              autoLogin: credentials.autoLogin === "true",
            };
          }

          // 3. Retourner l'objet user complet avec autoLogin
          return {
            id: userDetailsData.id,
            email: userDetailsData.email,
            telephone: userDetailsData.telephone || null,
            name: userDetailsData.name || null,
            firstname: userDetailsData.firstname || null,
            blocked: userDetailsData.blocked || false,
            jwt: loginData.jwt,
            role: userDetailsData.role?.type || null,
            roleName: userDetailsData.role?.name || null,
            // Sera utilisé dans le callback jwt() pour définir la durée
            autoLogin: credentials.autoLogin === "true",
          };
        } catch (error) {
          console.error("💥 Erreur auth:", error);
          return null;
        }
      },
    }),
  ],

  /**
   * ⚙️ CONFIGURATION DE LA SESSION
   *
   * Ces paramètres définissent le comportement GLOBAL de la session,
   * mais peuvent être surchargés dynamiquement dans les callbacks.
   */
  session: {
    // 📝 Stratégie JWT : Le token est stocké dans un cookie (pas en base de données)
    strategy: "jwt",

    // ⏱️ DURÉE MAXIMALE : 30 jours
    // C'est la durée MAX autorisée pour un token JWT
    // Si autoLogin = false, on va raccourcir cette durée à 1 jour dans le callback
    maxAge: 30 * 24 * 60 * 60, // 30 jours en secondes

    // 🔄 UPDATE AGE : Toutes les 24h, NextAuth vérifie si la session doit être rafraîchie
    // Si l'utilisateur est actif, le token est régénéré avec une nouvelle expiration
    // Exemple : Si autoLogin = true, chaque jour actif ajoute 30 jours supplémentaires
    updateAge: 24 * 60 * 60, // 24 heures en secondes
  },

  /**
   * 🍪 CONFIGURATION DES COOKIES
   *
   * NextAuth stocke le JWT dans un cookie HTTP-only pour la sécurité.
   * Ces paramètres définissent comment ce cookie est créé et géré.
   */
  cookies: {
    sessionToken: {
      // 📛 NOM DU COOKIE : Visible dans DevTools → Application → Cookies
      name: `next-auth.session-token`,

      options: {
        // 🔒 HTTP ONLY : Le cookie n'est PAS accessible via JavaScript (protection XSS)
        // Document.cookie ne pourra pas lire ce cookie
        httpOnly: true,

        // 🔐 SAME SITE : Le cookie n'est envoyé que pour les requêtes du même site
        // "lax" = envoyé pour les navigations GET, mais pas pour les POST cross-site
        // Protection contre CSRF (Cross-Site Request Forgery)
        sameSite: "lax",

        // 📍 PATH : Le cookie est valide pour tout le site
        path: "/",

        // 🔓 SECURE : En production, le cookie n'est envoyé que via HTTPS
        // En dev (HTTP), secure = false pour permettre le test en local
        secure: process.env.NODE_ENV === "production",

        // ⏰ MAX AGE : DURÉE DE VIE DU COOKIE (indépendant de l'expiration du JWT)
        // ⚠️ IMPORTANT : Cette durée est FIXE (30 jours maximum)
        // C'est la durée pendant laquelle le navigateur garde le cookie
        //
        // 🔍 DIFFÉRENCE AVEC session.maxAge :
        // - cookies.maxAge = Combien de temps le COOKIE reste dans le navigateur
        // - session.maxAge = Combien de temps le JWT à l'INTÉRIEUR du cookie est valide
        //
        // Exemple :
        // - Cookie maxAge = 30 jours → Le cookie existe pendant 30 jours dans le navigateur
        // - JWT expires (si autoLogin=false) = 1 jour → Le JWT à l'intérieur expire après 1 jour
        // → Résultat : Après 1 jour, le cookie existe toujours, mais le JWT est invalide
        //             → NextAuth détecte l'expiration et force la reconnexion
        maxAge: 30 * 24 * 60 * 60, // 30 jours en secondes
      },
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    /**
     * 🔐 CALLBACK JWT
     *
     * Appelé :
     * - À chaque fois qu'un JWT est créé (au login)
     * - À chaque fois qu'un JWT est lu (à chaque requête)
     * - Quand updateAge expire et qu'une régénération est nécessaire
     *
     * Le paramètre `user` n'existe QUE au moment du login initial.
     */
    async jwt({ token, user }) {
      // ✅ PREMIER LOGIN : user existe seulement ici
      if (user) {
        // Infos utilisateur copiées dans le token
        token.id = user.id;
        token.email = user.email;
        token.telephone = user.telephone;
        token.name = user.name;
        token.firstname = user.firstname;
        token.blocked = user.blocked;
        token.jwt = user.jwt; // JWT Strapi
        token.role = user.role;
        token.roleName = user.roleName;

        // 🔑 AUTOLOGIN - Stocké dans le token
        token.autoLogin = user.autoLogin;

        // ⏱️ DÉFINITION DE LA DURÉE DU TOKEN
        // Cette durée définit quand le JWT expire (indépendamment du cookie)
        if (user.autoLogin) {
          token.maxAge = 30 * 24 * 60 * 60; // 30 jours
        } else {
          token.maxAge = 24 * 60 * 60; // 1 jour
        }

        // 🕐 TIMESTAMP D'EXPIRATION
        // NextAuth utilise ce champ pour savoir quand le token est périmé
        token.exp = Math.floor(Date.now() / 1000) + token.maxAge;
      }

      // 🔄 À CHAQUE REQUÊTE : token est retourné tel quel (ou modifié si besoin)
      return token;
    },

    /**
     * 🌐 CALLBACK SESSION
     *
     * Appelé quand getSession() ou useSession() est utilisé.
     * Construit l'objet session à partir du token décodé.
     *
     * C'est ici qu'on définit ce qui sera disponible côté client.
     */
    async session({ session, token }) {
      // Copier les données du token dans session.user
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.telephone = token.telephone;
      session.user.name = token.name;
      session.user.firstname = token.firstname;
      session.user.blocked = token.blocked;
      session.user.role = token.role;
      session.user.roleName = token.roleName;
      session.jwt = token.jwt; // JWT Strapi

      // ⏰ DÉFINIR L'EXPIRATION DE LA SESSION
      // Cette date sera visible côté client et indique quand la session expire
      const now = Date.now();

      if (token.autoLogin) {
        // 🔓 Session longue : 30 jours
        session.expires = new Date(
          now + 30 * 24 * 60 * 60 * 1000,
        ).toISOString();
      } else {
        // 🔒 Session courte : 1 jour
        session.expires = new Date(now + 24 * 60 * 60 * 1000).toISOString();
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
