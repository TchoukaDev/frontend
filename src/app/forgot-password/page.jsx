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
