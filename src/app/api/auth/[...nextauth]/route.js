import { getCollection } from "@/app/libs/mongodb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
// Import du provider Credentials, qui permet une connexion avec email + mot de passe.
import Credentials from "next-auth/providers/credentials";

// Configuration principale de NextAuth
export const authOptions = {
  // Définition des providers d’authentification (ici seulement Credentials).
  providers: [
    Credentials({
      name: "Credentials", // Nom affiché pour ce provider
      credentials: {}, // Optionnel, ici non défini car on récupère email+password depuis un formulaire

      // Fonction appelée quand un utilisateur tente de se connecter
      async authorize(credentials) {
        // Récupération des champs envoyés par le formulaire
        const { email, password } = credentials;

        try {
          // Récupération de la collection "users" en base MongoDB
          const usersCollection = await getCollection("users");

          // Recherche d’un utilisateur avec l’email donné
          let user = await usersCollection.findOne({ email });

          // Si aucun utilisateur trouvé → on rejette
          if (!user) {
            throw new Error("Cet utilisateur n'existe pas.");
          }

          // Vérification du mot de passe (compare le mot de passe saisi avec le hash stocké)
          const passwordIsValid = await bcrypt.compare(password, user.password);
          if (!passwordIsValid) {
            throw new Error("Le mot de passe est incorrect");
          }

          // Reformater l’objet user pour n’exposer que les champs utiles (pas de mot de passe!)
          user = {
            _id: user._id.toString(),
            name: user.name,
            firstname: user.firstname,
            email: user.email,
            telephone: user.telephone,
          };

          // On retourne l’objet utilisateur validé
          return user;
        } catch (e) {
          // En cas d’erreur on log côté serveur
          console.error(e.message);
          // On relance une erreur générique (affichée côté client)
          throw new Error("Une erreur est survenue.");
        }
      },
    }),
  ],
  // Paramètres de session
  session: { strategy: "jwt" }, // JWT = on stocke les sessions dans des tokens, pas en DB

  // Clé secrète pour signer les JWT
  secret: process.env.NEXTAUTH_SECRET,

  // Pages customisées
  pages: { signIn: "/login" }, // Redirection vers ta page de login custom
  // Callbacks qui permettent de personnaliser le comportement
  callbacks: {
    // Callback JWT : appelé à chaque fois qu’un JWT est généré ou mis à jour
    async jwt({ token, user }) {
      // Si on a un utilisateur (connexion réussie), on l’attache au token
      user && (token.user = user);
      return token;
    },

    // Callback Session : appelé chaque fois qu’une session est créée/côté client
    async session({ session, user, token }) {
      // On copie les infos du token dans la session
      session.user = token.user;

      // On récupère l’email de l’utilisateur connecté
      const { email } = session.user;

      // Recherche de l’utilisateur en base pour récupérer les dernières infos
      const userDb = (await getCollection("users")).findOne({ email });

      // Si l’utilisateur n’existe plus → on retourne la session telle quelle
      if (!userDb) return session;

      // Reformater les infos utilisateur (sans données sensibles)
      session.user = {
        _id: (await userDb)._id.toString(),
        firstname: userDb.firstname,
        name: userDb.name,
        email: userDb.email,
        telephone: userDb.telephone,
      };

      return session;
    },
  },
};
// Création du handler NextAuth avec la configuration définie
const handler = NextAuth(authOptions);

// Exportation pour que NextAuth réponde aux requêtes GET et POST
// (nécessaire dans Next.js 13+ pour les routes API app router).
export { handler as GET, handler as POST };
