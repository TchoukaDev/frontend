"use server";
import ContactEmail from "@/emails/ContactEmail";
import { sendMailSchema } from "@/utils/validation";
import { render } from "@react-email/render";
import { Resend } from "resend";

// Créer l'instance de resend
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendMail = async (prevState, formData) => {
  const standardError = "Veuillez corriger les champs dans le formulaire";

  try {
    // Extraire les données du FormData
    const rawData = {
      firstname: formData.get("firstname"),
      name: formData.get("name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      prefersPhone: formData.get("prefersPhone") === "true", //convertir en boolean
      prefersEmail: formData.get("prefersEmail") === "true",
      message: formData.get("message"),
    };
    // Validation Zod
    const validationResult = sendMailSchema.safeParse(rawData);
    console.log(validationResult);
    // Formattage des erreur Zod
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

    const validatedData = validationResult.data;

    const emailHtml = await render(
      ContactEmail({
        firstname: validatedData.firstname,
        name: validatedData.name,
        email: validatedData.email,
        telephone: validatedData.telephone,
        prefersPhone: validatedData.prefersPhone,
        prefersEmail: validatedData.prefersEmail,
        message: validatedData.message,
      }),
    );

    // 5. Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: "Formulaire de Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO],
      replyTo: validatedData.email,
      subject: `Nouveau message de ${validatedData.firstname} ${validatedData.name}`,
      html: emailHtml, // ✅ HTML généré depuis React Email
    });

    // 5. Gérer les erreurs d'envoi
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return {
        success: false,
        error: "Impossible d'envoyer l'email. Veuillez réessayer plus tard.",
      };
    }

    console.log("Email envoyé avec succès:", data);

    // 6. Retourner le succès
    return {
      success: true,
      message:
        "Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error:
        "Une erreur est survenue côté serveur. Veuillez rééssayer plus tard.",
    };
  }
};
