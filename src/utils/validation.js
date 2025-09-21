import { z } from "zod";

export const signUpSchema = z
  .object({
    firstname: z
      .string()
      .min(1, "Veuillez saisir votre prénom")
      .max(30, "votre prénom ne peut pas dépasser 30 caractères"),

    name: z
      .string()
      .min(1, "Veuillez saisir votre nom")
      .max(30, "Votre nom ne peut pas dépasser 30 caractères"),

    email: z.string().email("Veuillez saisir une adresse email valide"),

    telephone: z
      .string()
      .regex(
        /^(?:\+33s*|0)[1-9]s*[0-9]{2}(s*[0-9]{2}){3}s*$/,
        "Veuillez saisir un numéro de téléphone valide",
      ),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule")
      .regex(/[a-z]/, "Le mot de passe doit contenir une minuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre")
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir un caractère spécial",
      ),

    password2: z.string(),
  })
  // Comparer les mots de passe
  .refine((data) => data.password === data.password2, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password2"],
  }); // l’erreur sera affichée sur le champ "password2"

export const loginSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse email valide."),
  password: z.string().min(1, "Veuillez saisir votre mot de passe"),
  autoLogin: z.boolean().optional(),
});
