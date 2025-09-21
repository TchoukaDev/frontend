"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validation";
import { signIn, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button/Button";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const emailRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      autoLogin: true,
    },
  });

  const emailRegister = register("email");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // ✅ Important !
      });

      if (result?.error) {
        // Gestion des erreurs NextAuth
        switch (result.error) {
          case "CredentialsSignin":
            setError("Email ou mot de passe incorrect");
            break;
          case "AccessDenied":
            setError("Accès refusé");
            break;
          default:
            setError("Une erreur s'est produite lors de la connexion");
        }
      } else if (result?.ok) {
        // Succès - redirection ou action
        const session = await getSession();
        console.log("Connecté:", session?.user);

        // Redirection basée sur le rôle ou préférences
        router.push("/");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Une erreur technique s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
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
            required
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
            {...register("password")}
            id="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
            required
          />
          {clientErrors.password && (
            <p className="formError">{clientErrors.password.message}</p>
          )}
        </div>
      </div>

      {/* Erreur générale */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="text-center my-3">
        <Button type="submit" disabled={isLoading || !isValid}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connexion...
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
