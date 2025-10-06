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

          if (!userDetailsResponse.ok) {
            console.error("❌ Failed to fetch user details:", userDetailsData);
            // Retourner quand même avec les données de base
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
            };
          }

          // 3. Retourner l'objet user complet
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
          };
        } catch (error) {
          console.error("💥 Erreur auth:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // user n'existe QUE lors du premier sign in
      if (user) {
        // Infos utilisateur
        token.id = user.id;
        token.email = user.email;
        token.telephone = user.telephone;
        token.name = user.name;
        token.firstname = user.firstname;
        token.blocked = user.blocked;

        // JWT Strapi (pour les requêtes API)
        token.jwt = user.jwt;

        // Rôle
        token.role = user.role;
        token.roleName = user.roleName;
      }
      return token;
    },

    async session({ session, token }) {
      // Infos utilisateur dans session.user
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.telephone = token.telephone;
      session.user.name = token.name;
      session.user.firstname = token.firstname;
      session.user.blocked = token.blocked;

      // Rôle dans session.user
      session.user.role = token.role;
      session.user.roleName = token.roleName;

      // JWT Strapi à la racine de session (séparé des infos user)
      session.jwt = token.jwt;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
