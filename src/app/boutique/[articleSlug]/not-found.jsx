import Card from "@/components/ui/Card/Card";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-evenly py-12 ">
        <h1 className="text-4xl font-bold mb-10">404</h1>
        <h2 className="text-2xl mb-4 text-blue3">Page non trouvée</h2>
        <p className="text-gray-600 my-10 font-semibold">
          Désolé, la publication que vous recherchez n'existe pas.
        </p>
        <Link className="btn" href="/boutique">
          Retour à la boutique
        </Link>
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
