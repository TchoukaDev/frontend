// actions/resetPasswordAction.js
"use server";

import { checkPassword } from "@/utils/checkPassword";

export async function resetPasswordAction(prevState, formData) {
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");
  const code = formData.get("code");

  // Validations côté serveur
  if (!checkPassword(password)) {
    return {
      success: false,
      errors: { password: true },
      message:
        "Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 majuscule et un caractère spécial.",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      errors: { passwordConfirmation: true },
      message: "Les deux mots de passe doivent être identiques.",
    };
  }

  if (!code) {
    return {
      success: false,
      errors: { code: true },
      message: "Le code de réinitialisation est expiré ou invalide.",
    };
  }

  // Appel direct à l'API Strapi
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
        }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        errors: null,
        message: "Mot de passe réinitialisé avec succès",
      };
    } else {
      // Erreur de Strapi (code invalide/expiré, etc.)
      return {
        success: false,
        errors: { server: true },
        message: data.error?.message || "Une erreur est survenue",
      };
    }
  } catch (error) {
    console.error("Erreur resetPasswordAction:", error);
    return {
      success: false,
      errors: { server: true },
      message: "Impossible de se connecter au serveur",
    };
  }
}
