import Card from "@/components/ui/Card/Card";
import Link from "next/link";

// app/not-found.jsx
export default function NotFound() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-evenly py-12 ">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page non trouvée</h2>
        <p className="text-gray-600 my-10 font-semibold">
          Désolé, la publication que vous recherchez n'existe pas.
        </p>
        <Link href="/infos">Retour à la page des informations diverses</Link>
      </div>
    </Card>
  );
}
export const metadata = {
  title: "Page introuvable - 404",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  robots: {
    index: false,
    follow: true,
    noarchive: true,
  },
};
