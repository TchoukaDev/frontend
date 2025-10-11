// actions/forgotPasswordAction.js
"use server";

import { checkEmail } from "@/utils/checkEmail";

export async function forgotPasswordAction(prevState, formData) {
  const email = formData.get("email");

  // Validation de l'email
  if (!checkEmail(email)) {
    return {
      success: false,
      error: true,
      message: "Cette adresse email n'est pas valide",
    };
  }

  // Appel à l'API Strapi
  try {
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
      },
    );

    // Parser la réponse JSON
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        error: false,
        message: "Un email de réinitialisation a été envoyé à votre adresse",
      };
    } else {
      // ✅ Gérer les erreurs de Strapi
      // Exemples : email non trouvé, compte bloqué, etc.
      return {
        success: false,
        error: true,
        message:
          data.error?.message || "Une erreur est survenue lors de l'envoi",
      };
    }
  } catch (e) {
    // ✅ Erreur réseau ou serveur down
    console.error("Erreur forgotPasswordAction:", e);
    return {
      success: false, // ✅ Corrigé (était true)
      error: true, // ✅ Corrigé (était false)
      message: "Impossible de se connecter au serveur",
    };
  }
}
