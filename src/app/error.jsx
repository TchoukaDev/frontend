"use client"; // ⚠️ OBLIGATOIRE pour error.jsx

import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

export default function Error({ error, reset }) {
  return (
    <Card>
      <div className="flex flex-col items-center justify-between py-12">
        <h1 className="text-4xl font-bold mb-4 text-red-500 font-title">
          Oups !
        </h1>
        <h2 className="text-2xl mb-4">Une erreur s'est produite</h2>
        <p className="text-gray-600 my-10 text-center font-semibold text-lg">
          Quelque chose s'est mal passé!
        </p>

        <div className="space-x-4">
          {/* Reset */}
          <Button onClick={reset}>Réessayer</Button>
          {/* Redirection */}
          <Button onClick={() => (window.location.href = "/")}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Card>
  );
}
