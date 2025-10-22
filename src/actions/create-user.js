"use server";

import { strapiClient } from "@/libs/strapiClient";
import { signUpSchema } from "@/utils/validation";

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
      isLicensed: formData.get("isLicensed"),
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

    // Vérifie si l'email existe
    const existingUser = await strapiClient.emailExists(validatedData.email);
    if (existingUser) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { email: "Cet email est déjà utilisé" },
      };
    }

    // Vérifie si le téléphone existe
    const existingPhone = await strapiClient.phoneExists(
      validatedData.telephone,
    );
    if (existingPhone) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { telephone: "Ce numéro de téléphone est déjà utilisé." },
      };
    }

    // Le mot de passe est haché automatiquement par Strapi

    //   Formatter l'objet user
    const newUser = {
      firstname: validatedData.firstname,
      name: validatedData.name,
      email: validatedData.email,
      telephone: validatedData.telephone,
      password: validatedData.password,
      isLicensed: validatedData.isLicensed,
    };
    //   Ajouter l'utilisateur
    await strapiClient.register(newUser);

    //   Success
    return {
      success: true,
      message:
        "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
    };
  } catch (e) {
    console.error("Erreur serveur:", e);

    // Gestion des erreurs Strapi
    const errorMessage = e.message || "";

    if (errorMessage.includes("email") || errorMessage.includes("Email")) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { email: "Cet email est déjà utilisé" },
      };
    }

    if (errorMessage.includes("telephone") || errorMessage.includes("phone")) {
      return {
        success: false,
        error: standardError,
        fieldErrors: { telephone: "Ce numéro est déjà utilisé" },
      };
    }

    // Erreur générique
    return {
      success: false,
      error:
        "Une erreur est survenue côté serveur. Merci de réessayer plus tard.",
    };
  }
};
