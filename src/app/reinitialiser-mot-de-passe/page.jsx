import ResetPasswordForm from "@/components/Forms/ResetPasswordForm/ResetPasswordForm";
import Card from "@/components/ui/Card/Card";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default function ResetPassword() {
  return (
    <Card>
      <h1>Réinitialisation du mot de passe</h1>
      <section className="section min-h-[50vh] space-y-6 ">
        <p className="text-center prose max-w-none">
          Veuillez saisir votre nouveau mot de passe et le confirmer:
        </p>
        <Suspense
          fallback={
            <div className="flex justify-center items-center text-blue3">
              <ClipLoader />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </section>
    </Card>
  );
}

// Metadatas
export const metadata = {
  title: "Réinitialisation du mot de passe",
  description: "Créez un nouveau mot de passe pour votre compte.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};
