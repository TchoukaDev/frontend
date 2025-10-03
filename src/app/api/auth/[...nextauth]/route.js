// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
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
          const response = await fetch(
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

          const data = await response.json();

          if (response.ok && data.jwt) {
            const user = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              firstname: data.user.firstname,
              username: data.user.username || data.user.email,
              jwt: data.jwt,
            };
            return user;
          }

          return null;
        } catch (error) {
          console.error("Erreur auth:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
