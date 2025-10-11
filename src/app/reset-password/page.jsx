import ResetPasswordForm from "@/components/Forms/ResetPasswordForm/ResetPasswordForm";
import Card from "@/components/ui/Card/Card";

export default function ResetPassword() {
  return (
    <Card>
      <h1>Réinitialisation du mot de passe</h1>
      <section className="section min-h-[50vh] space-y-6 ">
        <p className="text-center prose max-w-none">
          Veuillez saisir votre nouveau mot de passe et le confirmer:
        </p>
        <ResetPasswordForm />
      </section>
    </Card>
  );
}
