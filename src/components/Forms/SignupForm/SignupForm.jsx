"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { createUser } from "@/actions/create-user";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FaEyeSlash } from "react-icons/fa";
import { Eye } from "lucide-react";

export default function SignupForm() {
  // State pour gérer affichage ou non du  password
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Hook pour server action
  const [serverState, formAction, isPending] = useActionState(createUser, null);

  // Hooks pour redirection
  const router = useRouter();

  // React-Hook-Form + Resolver pour Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientErrors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema), mode: "onChange" });

  const firstnameRegister = register("firstname");
  const firstnameRef = useRef();

  // Envoi du formulaire au serveur
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    startTransition(() => {
      formAction(formData);
    });
  };

  // reset du formulaire
  useEffect(() => {
    if (serverState?.success && !isPending && !isSubmitting) {
      reset();
    }
  }, [serverState, isSubmitting, isPending, reset]);

  // Focus au chargement de la page
  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  // Si inscription réussie, montre uniquement le message et bouton pour login
  {
    serverState?.success && (
      <div className="bg-green-100 border border-green-400 text-green-700 text-center p-6 rounded">
        <p className="mb-3">{serverState.message} </p>
        {/* Bouton de connexion après succès */}
        <Button
          onClick={(e) => {
            router.push("/login");
          }}
          margin="my-3"
          className="btn"
        >
          Se connecter
        </Button>
      </div>
    );
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-4 space-y-6"
    >
      {/* Informations personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
        {/* Prénom */}{" "}
        <div className="text-center md:text-start">
          <label htmlFor="firstname" className="label">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            {...firstnameRegister}
            ref={(e) => {
              firstnameRegister.ref(e);
              firstnameRef.current = e;
            }}
            placeholder="Votre prénom"
            autoComplete="given-name"
            className="input"
          />
          {/* Erreur côté client */}
          {clientErrors.firstname && (
            <p className="formError">{clientErrors.firstname.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.firstname && !clientErrors.firstname && (
            <p className="formError">{serverState.fieldErrors.firstname}</p>
          )}
        </div>
        {/* Nom de famille */}
        <div className="text-center md:text-start">
          <label htmlFor="name" className="label">
            Nom de famille
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Votre nom"
            autoComplete="family-name"
            className="input"
          />
          {/* Erreur côté client */}
          {clientErrors.name && (
            <p className="formError">{clientErrors.name.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.name && !clientErrors.name && (
            <p className="formError">{serverState.fieldErrors.name}</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
        {/* Adresse email */}
        <div className="text-center md:text-start">
          <label htmlFor="email" className="label">
            Adresse mail
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Votre adresse email"
            autoComplete="email"
            className="input"
          />
          {/* Erreur côté client */}
          {clientErrors.email && (
            <p className="formError">{clientErrors.email.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.email && !clientErrors.email && (
            <p className="formError">{serverState.fieldErrors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="text-center md:text-start">
          <label htmlFor="telephone" className="label">
            Téléphone
          </label>
          <input
            {...register("telephone")}
            type="tel"
            id="telephone"
            placeholder="Votre numéro de téléphone"
            autoComplete="tel"
            className="input"
          />
          {/* Erreur côté client */}
          {clientErrors.telephone && (
            <p className="formError">{clientErrors.telephone.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.telephone && !clientErrors.telephone && (
            <p className="formError">{serverState.fieldErrors.telephone}</p>
          )}
        </div>
      </div>

      {/* Mot de passe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
        <div className="text-center md:text-start">
          <label htmlFor="password" className="label">
            Mot de passe
          </label>
          <div className="relative">
            {" "}
            <input
              className="input pr-10" // Ajout de pr-10 pour laisser de la place à l'icône
              type={showPassword ? "text" : "password"} // Type dynamique
              {...register("password")}
              id="password"
              placeholder="Votre mot de passe"
              autoComplete="current-password"
            />
            {/*Bouton d'affichage mot de passe */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-[calc(50%+5px)] text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {/* Erreur côté client */}
          {clientErrors.password && (
            <p className="formError">{clientErrors.password.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.password && !clientErrors.password && (
            <p className="formError">{serverState.fieldErrors.password}</p>
          )}
        </div>

        {/* Confirmation du mot de passe */}
        <div className="text-center md:text-start">
          <label htmlFor="password2" className="label">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            {" "}
            <input
              className="input pr-10"
              type={showPassword2 ? "text" : "password"}
              {...register("password2")}
              id="password"
              placeholder="Confirmez votre mot de passe"
            />
            {/*Bouton d'affichage mot de passe */}
            <button
              type="button"
              onClick={() => setShowPassword2((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-[calc(50%+5px)] text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={
                showPassword2
                  ? "Masquer les mot de passe"
                  : "Afficher les mot de passe"
              }
            >
              {showPassword2 ? (
                <FaEyeSlash className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {/* Erreur côté client */}
          {clientErrors.password2 && (
            <p className="formError">{clientErrors.password2.message}</p>
          )}
          {/* Erreur côté serveur */}
          {serverState?.fieldErrors?.password2 && !clientErrors.password2 && (
            <p className="formError">{serverState.fieldErrors.password2}</p>
          )}
        </div>
      </div>

      {/* Bouton d'envoi */}
      <div className="text-center">
        <Button disabled={isSubmitting || isSubmitting} type="submit">
          {isSubmitting || isPending ? (
            <span className="flex items-center text-sand justify-center gap-2">
              Inscription en cours... <ClipLoader size={20} />
            </span>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </div>

      {/* Erreur serveur générale */}
      {serverState?.error && !serverState?.fieldErrors && (
        <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded">
          {serverState.error}
        </div>
      )}
    </form>
  );
}
