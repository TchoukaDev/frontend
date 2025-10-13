"use client";
import { resetPasswordAction } from "@/actions/resetPasswordAction";
import Button from "@/components/ui/Button/Button";
import { checkPassword } from "@/utils/checkPassword";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useActionState, useEffect, useRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || null;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const initialState = { errors: null, message: "", success: false };
  const [serverState, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );
  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef?.current?.focus();
  }, []);

  const prepareFormAction = () => {
    //   Réinitialisater les erreurs client
    setClientErrors({});

    // Vérifier sécurité du mot de passe
    if (!checkPassword(password)) {
      setClientErrors({
        password: true,
        message:
          "Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 majuscule et un caractère spécial.",
      });
      return;
    }
    // Vérifier si les deux mots de passe sont identiques
    if (password !== confirmPassword) {
      setClientErrors({
        confirmPassword: true,
        message: "Les deux mots de passe doivent être identiques.",
      });
      return;
    }

    if (!code) {
      setClientErrors({
        code: true,
        message: "Le code de réinitialisation est expiré ou invalide.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("password", password);
    formData.append("passwordConfirmation", confirmPassword); // ✅ Nom Strapi standard
    formData.append("code", code);

    formAction(formData);
  };

  // Succès
  if (serverState?.success && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="bg-green-100 border border-green-400 text-green-700 text-center my-5 px-4 py-3 rounded">
          Votre mot de passe a été réinitialisé, vous pouvez vous connecter.
        </p>
        <Link className="btn" href="/connexion">
          Se connecter
        </Link>
      </div>
    );
  }

  // Si code manquant ou invalide
  if (!code && !serverState?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-red-600">Erreur</h2>
        <p className="bg-red-100 border border-red-400 text-red-700 text-center my-5 px-4 py-3 rounded">
          Le code de réinitialisation est invalide ou expiré.
        </p>
        <div>
          <Link className="btn" href="/">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      action={prepareFormAction}
      className=" max-w-2xl mx-auto p-4 space-y-6 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Mot de passe */}
        <div className="relative">
          <input
            ref={passwordRef}
            className="input md:w-[300px] pr-10" // Ajout de pr-10 pour laisser de la place à l'icône
            type={showPassword ? "text" : "password"} // Type dynamique
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            required
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

        {/* Erreurs */}
        {clientErrors?.password && (
          <p className="formError">{clientErrors?.message}</p>
        )}
        {serverState?.errors?.password && !clientErrors.password && (
          <p className="formError">{serverState.message}</p>
        )}

        {/* Confirmation du mot de passe */}
        <div className="relative">
          <input
            className="input pr-10 md:w-[300px]" // Ajout de pr-10 pour laisser de la place à l'icône
            type={showConfirmPassword ? "text" : "password"} // Type dynamique
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            placeholder="Confirmer le mot de passe"
            autoComplete="current-password"
            required
          />

          {/*Bouton d'affichage mot de passe */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-[calc(50%+5px)] text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={
              showConfirmPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Erreurs */}
        {clientErrors?.confirmPassword && (
          <p className="formError">{clientErrors?.message}</p>
        )}
        {serverState?.errors?.confirmPassword &&
          !clientErrors.confirmPassword && (
            <p className="formError">{serverState.message}</p>
          )}
        {/* Input hidden pour le code */}
        {/* <input type="hidden" name="code" id="code" value={code} /> */}

        {/* Erreurs */}
        {clientErrors?.code && (
          <p className="formError">{clientErrors?.code?.message}</p>
        )}
        {serverState?.errors?.code && !clientErrors?.code && (
          <p>{serverState.message}</p>
        )}

        {/* Erreur générale */}
        {serverState?.errors && (
          <p className="bg-red-100 border border-red-400 text-red-700 text-center my-5 px-4 py-3 rounded">
            {serverState.message}
          </p>
        )}
        {/* Bouton de soumission */}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Envoi en cours..." : "Valider"}
        </Button>
      </div>
    </form>
  );
}
