import LoginForm from "@/components/LoginForm/LoginForm";
import Card from "@/components/ui/Card/Card";
import Link from "next/link";

export default function login() {
  return (
    <section>
      <Card>
        <h1>Connexion</h1>
        <section className="section">
          <p className="my-8 text-center font-semibold">
            Connectez-vous pour pouvoir consulter l'ensemble du contenu du site.
          </p>
          <LoginForm />
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
