"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMailSchema } from "@/utils/validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { sendMail } from "@/actions/sendMail";

export default function ContactForm() {
  // Hook pour server action
  const [serverState, formAction, isPending] = useActionState(sendMail, null);

  // Hooks pour redirection
  const router = useRouter();

  // React-Hook-Form + Resolver pour Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientErrors, isSubmitting },
  } = useForm({ resolver: zodResolver(sendMailSchema), mode: "onChange" });

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

  // Focus au chargement de la page
  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  // Si succès, afficher uniquement le message et le bouton
  if (serverState?.success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 text-center p-6 rounded">
        <p className="mb-6">{serverState.message} </p>
        {/* Bouton pour envoyer un autre email après succès */}
        <Button
          onClick={() => {
            window.location.href = "/contact";
          }}
          margin="my-3"
          className="btn"
        >
          Envoyer un autre message.
        </Button>
      </div>
    );
  }

  return (
    <>
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
        {/* Choix du mode de contact */}
        <div className="text-center">
          <p className="mb-3">
            Par quel moyen préférez-vous être contacté? (Cocher au moins une
            case)
          </p>
          {/* Téléphone */}
          <div className="flex justify-center text-center items-center gap-10 mb-3">
            <div>
              <label
                htmlFor="prefersPhone"
                className="label inline-block align-middle mr-2"
              >
                Téléphone:
              </label>
              <input
                type="checkbox"
                {...register("prefersPhone")}
                id="prefersPhone"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="prefersEmail"
                className="label inline-block align-middle mr-2"
              >
                Email:
              </label>
              <input
                type="checkbox"
                {...register("prefersEmail")}
                id="prefersEmail"
              />{" "}
            </div>
          </div>
          {/* Erreur client */}
          {clientErrors?.wayToContact && (
            <p className="formError">{clientErrors.wayToContact.message}</p>
          )}
          {/* Erreur serveur */}
          {serverState?.fieldErrors?.wayToContact &&
            !clientErrors.wayToContact && (
              <p className="formError">
                {serverState.fieldErrors.wayToContact}
              </p>
            )}
        </div>

        {/* Message */}
        <textarea
          className="input max-w-none w-fit"
          rows={10}
          cols={80}
          id="message"
          {...register("message")}
          placeholder="Saisissez votre message"
        />
        {/* Erreur client */}
        {clientErrors?.message && (
          <p className="formError">{clientErrors.message.message}</p>
        )}
        {/* Erreur serveur */}
        {serverState?.fieldErrors?.message && !clientErrors.message && (
          <p className="formError">{serverState?.fieldErrors.message}</p>
        )}
        {/* Bouton d'envoi */}
        <div className="text-center">
          <Button disabled={isSubmitting || isSubmitting} type="submit">
            {isSubmitting || isPending ? (
              <span className="flex items-center text-sand justify-center gap-2">
                Envoi en cours... <ClipLoader size={20} />
              </span>
            ) : (
              "Envoyer"
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
    </>
  );
}
