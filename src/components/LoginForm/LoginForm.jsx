// components/LoginForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button/Button";
import { ClipLoader } from "react-spinners";

export default function LoginForm({ callbackUrl = "/" }) {
  const [isPending, setIsPending] = useState(false);
  const [serverError, setServerError] = useState(null);
  const emailRef = useRef();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientErrors },
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
    setIsPending(true);
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
        setIsPending(false);
      } else {
        // Succès !
        const redirect = callbackUrl && callbackUrl != null ? callbackUrl : "/";
        router.push(redirect); // Change selon ta page de destination
        router.refresh(); // Force le rafraîchissement de la session
      }
    } catch (error) {
      console.error("Erreur:", error);
      setServerError("Une erreur s'est produite");
      setIsPending(false);
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
          <input
            className="input"
            type="password"
            {...register("password", {
              required: "Veuillez saisir votre mot de passe",
              minLength: {
                value: 6,
                message: "Minimum 6 caractères requis",
              },
            })}
            id="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
          />
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
      )}

      <div className="text-center my-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
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
        </div>
      </div>
    </form>
  );
}
