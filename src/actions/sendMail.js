"use server";
import { sendMailSchema } from "@/utils/validation";
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
    console.log("🟢 [SERVEUR] Données validées:", validatedData);

    // Vérifier les variables d'environnement
    console.log(
      "🔵 [SERVEUR] RESEND_API_KEY existe:",
      !!process.env.RESEND_API_KEY,
    );
    console.log("🔵 [SERVEUR] EMAIL_TO:", process.env.EMAIL_TO);

    // Envoi de l'email
    console.log("🔵 [SERVEUR] Tentative d'envoi email...");

    // 4. Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: "Formulaire de Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO], // L'email du client
      replyTo: validatedData.email, // L'email du visiteur
      subject: `Nouveau message de ${validatedData.firstname} ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📧 Nouveau message de contact</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #667eea; font-size: 18px; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Informations du contact
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280; width: 150px;">Nom complet :</td>
                  <td style="padding: 10px 0;">${validatedData.firstname} ${
                    validatedData.name
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Email :</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${
                      validatedData.email
                    }" style="color: #667eea; text-decoration: none;">
                      ${validatedData.email}
                    </a>
                  </td>
                </tr>
                ${
                  validatedData.telephone
                    ? `
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Téléphone :</td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${validatedData.telephone}" style="color: #667eea; text-decoration: none;">
                      ${validatedData.telephone}
                    </a>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #667eea; font-size: 18px; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Préférence de contact
              </h2>
              <div style="display: flex; gap: 20px;">
                <div style="flex: 1; padding: 10px; background: ${
                  validatedData.prefersPhone ? "#d1fae5" : "#fee2e2"
                }; border-radius: 6px; text-align: center;">
                  <span style="font-size: 24px;">${
                    validatedData.prefersPhone ? "✅" : "❌"
                  }</span>
                  <p style="margin: 5px 0 0 0; font-weight: bold;">Par téléphone</p>
                </div>
                <div style="flex: 1; padding: 10px; background: ${
                  validatedData.prefersEmail ? "#d1fae5" : "#fee2e2"
                }; border-radius: 6px; text-align: center;">
                  <span style="font-size: 24px;">${
                    validatedData.prefersEmail ? "✅" : "❌"
                  }</span>
                  <p style="margin: 5px 0 0 0; font-weight: bold;">Par email</p>
                </div>
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #667eea; font-size: 18px; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Message
              </h2>
              <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px; line-height: 1.6;">
                ${validatedData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Ce message a été envoyé depuis le formulaire de contact de votre site web le ${new Date().toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>
          </div>
        </div>
      `,
      // Version texte brut (fallback pour clients email sans HTML)
      text: `
NOUVEAU MESSAGE DE CONTACT

Nom complet: ${validatedData.firstname} ${validatedData.name}
Email: ${validatedData.email}
Téléphone: ${validatedData.telephone || "Non fourni"}

Préférence de contact:
- Par téléphone: ${validatedData.prefersPhone ? "Oui" : "Non"}
- Par email: ${validatedData.prefersEmail ? "Oui" : "Non"}

Message:
${validatedData.message}

---
Ce message a été envoyé depuis le formulaire de contact de votre site web.
      `,
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
