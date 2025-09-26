"use client";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { useRouter } from "next/navigation";

// app/not-found.jsx
export default function NotFound() {
  const router = useRouter();
  return (
    <Card>
      <div className="flex flex-col items-center justify-evenly py-12 ">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page non trouvée</h2>
        <p className="text-gray-600 my-10 font-semibold">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
      </div>
    </Card>
  );
}
