"use client";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { useRouter, useSearchParams } from "next/navigation";

// app/not-found.jsx
export default async function ForbiddenPage({ searchParams }) {
  const router = useRouter();
  const resolvedSearchParams = await searchParams;
  const from = resolvedSearchParams.from || null;

  const getRedirectMessage = () => {
    if (!from) return "Cette page est strictement réservée";

    const messages = {
      "/section-animateurs":
        "Accès refusé : cette page est accessible exclusivement aux animateurs",
    };

    const matchedRoute = Object.keys(messages).find((route) =>
      from.startsWith(route),
    );

    return messages[matchedRoute] || "Cette page est strictement réservée";
  };

  const redirectMessage = getRedirectMessage();

  return (
    <Card>
      <div className="flex flex-col items-center justify-evenly py-12 ">
        <h1 className="text-4xl font-bold mb-10">Erreur 403</h1>
        <h2 className="text-2xl mb-4 text-blue3">Accès refusé</h2>
        <p className="text-gray-600 my-10 font-semibold">{redirectMessage}</p>
        <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
      </div>
    </Card>
  );
}
