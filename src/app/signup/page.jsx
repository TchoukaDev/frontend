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
            <Link
              href="/login"
              className="text-blue-800 hover:text-blue3 hover:underline duration-200"
            >
              Connectez-vous.
            </Link>
          </p>
        </section>
      </Card>
    </section>
  );
}
