import LoginForm from "@/components/LoginForm/LoginForm";
import Card from "@/components/ui/Card/Card";
import Link from "next/link";

export default async function login({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl || null;

  // Message personnalisé après redirection
  const getRedirectMessage = () => {
    const messages = {
      "/competitions":
        "Vous devez être connecté pour accéder aux informations des compétitions.",
      "/section-animateurs":
        "Cette page est strictement réservée aux animateurs. Veuillez vous connecter avec un compte animateur.",
    };
    const route = Object.keys(messages).find((route) =>
      callbackUrl.startsWith(route),
    );
    return messages[route];
  };
  const redirectMessage = getRedirectMessage(callbackUrl);

  return (
    <section>
      <Card>
        <h1>Connexion</h1>

        <section className="section">
          {redirectMessage && (
            <p className="formError text-center">{redirectMessage}</p>
          )}
          <p className="my-8 text-center font-semibold">
            Connectez-vous pour pouvoir consulter l'ensemble du contenu du site.
          </p>
          <LoginForm callbackUrl={callbackUrl} />
          <p className=" text-center text-sm my-2">
            Pas encore inscrit?{" "}
            <Link
              href="/signup"
              className="text-blue-800 hover:text-blue3 hover:underline duration-200"
            >
              Inscrivez-vous.
            </Link>
          </p>
        </section>
      </Card>
    </section>
  );
}
