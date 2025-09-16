"use client";

import Link from "next/link";
import Button from "../Button/Button";

export default function LoginForm() {
  return (
    <div className="p-1.5 text-black font-main">
      <p className="text-center font-semibold underline">Connexion</p>
      <form>
        <p className="mt-2 text-center">
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autocomplete="email"
            required
            aria-label="email"
          />
        </p>
        <p className="mt-2 text-center">
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            autocomplete="current-password"
            required
            aria-label="mot de passe"
          />
        </p>
        <p className="mt-2 w-[70%] mx-auto">
          <Button>Se connecter</Button>
          <div className="flex items-center justify-center my-2 gap-1">
            <label htmlFor="autoLogin" className=" text-xs">
              Se souvenir de moi
            </label>
            <input
              type="checkbox"
              name="autoLogin"
              id="autoLogin"
              defaultChecked
            />
          </div>
        </p>
      </form>
      <p class="text-sm">
        Pas encore inscrit?{" "}
        <Link
          href="/signup"
          className="text-blue3 hover:text-blue2 underline duration-200"
        >
          Inscrivez-vous.
        </Link>
      </p>
    </div>
  );
}
