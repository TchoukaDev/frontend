"use server";

import { getCollection } from "@/app/libs/mongodb";
import { signUpSchema } from "@/utils/validation";
import bcrypt from "bcrypt";

export const createUser = async (prevState, formData) => {
  const standardError = "Veuillez corriger les champs dans le formulaire";

  try {
    // 1. Extraction des données du FormData
    const rawData = {
      firstname: formData.get("firstname"),
      name: formData.get("name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      password: formData.get("password"),
      password2: formData.get("password2"),
    };

    // 2. Validation avec le même schéma Zod côté serveur
    const validationResult = signUpSchema.safeParse(rawData);

    if (!validationResult.success) {
      // validationResult.error.issues contient toutes les erreurs de validation
      // Exemple de contenu :
      // [
      //   { path: ['email'], message: 'Format d\'email invalide' },
      //   { path: ['password'], message: 'Le mot de passe doit contenir au moins 8 caractères' }
      // ]

      // Transformer les erreurs Zod en objet simple
      const fieldErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]; // 'email', 'password', etc.
        const errorMessage = issue.message; // Le message d'erreur
        fieldErrors[fieldName] = errorMessage;
      });

      // Résultat : fieldErrors = {
      //   email: "Format d'email invalide",
      //   password: "Le mot de passe doit contenir au moins 8 caractères"
      // }

      return {
        success: false,
        error: standardError, // Message général
        fieldErrors: fieldErrors, // Erreurs spécifiques par champ
      };
    }
    const validatedData = validationResult.data;
    // Récupère la collection une seule fois
    const usersCollection = await getCollection("users");

    // Vérifie si l'email existe
    const existingUser = await usersCollection.findOne({
      email: validatedData.email,
    });
    if (existingUser) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { email: "Cet email est déjà utilisé" },
      };
    }

    // Vérifie si le téléphone existe
    const existingPhone = await usersCollection.findOne({
      telephone: validatedData.telephone,
    });
    if (existingPhone) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { telephone: "Ce numéro de téléphone est déjà utilisé." },
      };
    }
    // Sécuriser le mot de passe
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    //   Formatter l'objet user
    const newUser = {
      firstname: validatedData.firstname,
      name: validatedData.name,
      email: validatedData.email,
      telephone: validatedData.telephone,
      password: hashedPassword,
      isAdmin: 0,
      isBlocked: 0,
      createdAt: new Date(),
    };

    //   Ajouter l'utilisateur
    await usersCollection.insertOne(newUser);

    //   Success
    return {
      success: true,
      message:
        "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
    };
  } catch (e) {
    console.error("Erreur serveur:", e.message);
    // On ne throw pas, on renvoie un objet compréhensible côté client
    return {
      success: false,
      error:
        "Une erreur est survenue côté serveur. Merci de réessayer plus tard.",
    };
  }
};
