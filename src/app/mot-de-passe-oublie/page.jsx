import ForgotPasswordForm from "@/components/Forms/ForgotPasswordForm/ForgotPasswordForm";
import Card from "@/components/ui/Card/Card";

export default function ForgotPassword() {
  return (
    <Card>
      <h1>Mot de passe oublié</h1>
      <section className="section min-h-[50vh] flex flex-col items-center justify-center gap-10">
        <p className="text-center prose max-w-none  ">
          Vous avez oublié votre mot de passe? Ne vous inquiétez pas, vous
          pouvez le réinitialiser en renseignant votre adresse email:
        </p>
        <ForgotPasswordForm />
      </section>
    </Card>
  );
}

// Metadata
export const metadata = {
  title: "Mot de passe oublié",
  description:
    "Réinitialisez votre mot de passe pour accéder à votre compte membre.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};
