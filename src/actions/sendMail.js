"use server";
import { sendMailSchema } from "@/utils/validation";

export const sendMail = async (data) => {
  const standardError = "Veuillez corriger les champs dans le formulaire";
  try {
    const rawData = {
      firstname: formData.get("firstname"),
      name: formData.get("name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      prefersPhone: formData.get("prefersPhone"),
      prefersEmail: formData.get("prefersEmail"),
      message: formData.get("message"),
    };
    const validationResult = sendMailSchema.safeParse(rawData);

    if (validationResult.error) {
      const fieldErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        const errorMessage = issue.message;
        fieldErrors[fieldName] = errorMessage;
      });

      return {
        success: false,
        error: standardError,
        fieldErrors: fieldErrors,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error:
        "Une erreur est survenue côté serveur. Veuillez rééssayer plus tard.",
    };
  }
};
