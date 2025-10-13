import SignupForm from "@/components/Forms/SignupForm/SignupForm";
import Card from "@/components/ui/Card/Card";
import Link from "next/link";

export default function signUp() {
  return (
    <section>
      <Card>
        <h1>Inscription</h1>
        <section className="section">
          <p className="my-8 text-center font-semibold">
            Inscrivez-vous pour pouvoir vous connectez sur le site. Pour cela,
            veuillez compléter les champs du formulaire.{" "}
          </p>
          <SignupForm />
          <p className="text-sm text-center my-2">
            Vous avez déjà un compte?{" "}
            <Link href="/connexion" className="link">
              Connectez-vous.
            </Link>
          </p>
        </section>
      </Card>
    </section>
  );
}

export const metadata = {
  title: "Inscription",
  description:
    "Créez votre compte membre pour accéder au contenu exclusif des Randonneurs des Sables du Born : actualités, compétitions et informations réservées.",

  // ❌ Pas d'indexation pour les pages d'inscription
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },

  // ✅ OpenGraph minimal
  openGraph: {
    title: "Inscription - Randonneurs des Sables du Born",
    description: "Créez votre compte membre pour accéder au contenu exclusif",
    url: "/inscription",
    type: "website",
  },

  // ✅ URL canonique
  alternates: {
    canonical: "/inscription",
  },
};
