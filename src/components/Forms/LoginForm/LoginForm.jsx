// components/LoginForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { ClipLoader } from "react-spinners";
import { getSafeRedirectUrl } from "@/utils/getSafeRedirectUrl";
import { Eye } from "lucide-react";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm({ callbackUrl = "/" }) {
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientErrors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      autoLogin: true,
    },
  });

  const emailRegister = register("email", {
    required: "Veuillez saisir votre email",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Veuillez saisir une adresse email valide",
    },
  });

  // Soumission du formulaire
  const onSubmit = async (data) => {
    setServerError(null);

    try {
      // Appel à NextAuth
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        autoLogin: String(data.autoLogin), //Convertir en string
        redirect: false, // Important : on gère la redirection manuellement
      });

      if (result?.error) {
        // Erreur de connexion
        setServerError("Email ou mot de passe incorrect");
      } else {
        // Succès !
        const redirect = getSafeRedirectUrl(callbackUrl);
        router.push(redirect); // Change selon ta page de destination
        router.refresh(); // Force le rafraîchissement de la session
      }
    } catch (error) {
      console.error("Erreur:", error);
      setServerError("Une erreur s'est produite");
    } finally {
      reset();
    }
  };

  // Focus au montage
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 space-y-6 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Email */}
        <div className="text-center md:text-start w-full md:w-1/2">
          <label className="label" htmlFor="email">
            Adresse email:
          </label>
          <input
            className="input"
            type="email"
            {...emailRegister}
            ref={(e) => {
              emailRegister.ref(e);
              emailRef.current = e;
            }}
            id="email"
            placeholder="Email"
            autoComplete="email"
          />
          {clientErrors.email && (
            <p className="formError">{clientErrors.email.message}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="text-center md:text-start w-full md:w-1/2">
          <label htmlFor="password" className="label">
            Mot de passe
          </label>
          <div className="relative">
            <input
              className="input pr-10" // Ajout de pr-10 pour laisser de la place à l'icône
              type={showPassword ? "text" : "password"} // Type dynamique
              {...register("password", {
                required: "Veuillez saisir votre mot de passe",
                minLength: {
                  value: 8,
                  message: "Minimum 8 caractères requis",
                },
              })}
              id="password"
              placeholder="Mot de passe"
              autoComplete="current-password"
            />
            {/*Bouton d'affichage mot de passe */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-5 top-1/2 -translate-y-[calc(50%+5px)] text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {clientErrors.password && (
            <p className="formError">{clientErrors.password.message}</p>
          )}
        </div>
      </div>
      {/* Erreur serveur */}
      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded">
          <p>{serverError}</p>
        </div>
      )}{" "}
      <Link
        href="/forgot-password"
        className="text-blue-800 hover:text-blue3 hover:underline duration-200 text-xs"
      >
        Mot de passe oublié?
      </Link>
      <div className="text-center my-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center text-sand justify-center gap-2">
              Connexion... <ClipLoader size={20} />
            </span>
          ) : (
            "Se connecter"
          )}
        </Button>
        <div className="flex items-center justify-center my-3 gap-1">
          <label htmlFor="autoLogin" className="text-xs cursor-pointer">
            Se souvenir de moi
          </label>
          <input
            type="checkbox"
            className="cursor-pointer"
            {...register("autoLogin")}
            id="autoLogin"
          />
        </div>{" "}
      </div>
    </form>
  );
}
