"use client";

import { forgotPasswordAction } from "@/actions/forgotPasswordAction";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const initialState = { error: null, message: "", success: false };
  const [serverState, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState,
  );
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  if (serverState?.success && !isPending) {
    return (
      <div className="flex flex-col justify-center items-center gap-10 max-w-2xl mx-auto p-4 ">
        <p className="bg-green-100 border border-green-400 text-green-700 text-center my-5 px-4 py-3 rounded">
          {serverState.message}
        </p>
        <Link className="btn" href="/">
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  const prepareFormAction = () => {
    const formData = new FormData();
    formData.append("email", email);
    formAction(formData);
  };

  return (
    <form
      action={prepareFormAction}
      className="flex flex-col items-center w-full md:w-1/2 gap-5"
    >
      <input
        ref={emailRef}
        className="input"
        type="email"
        name="email"
        id="email"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="email"
      />

      <Button disabled={isPending} type="submit">
        {isPending ? "Envoi en cours..." : "Valider"}
      </Button>

      {serverState?.error && (
        <p className="bg-red-100 border border-red-400 text-red-700 text-center my-5 px-4 py-3 rounded">
          {serverState.message}
        </p>
      )}
    </form>
  );
}
