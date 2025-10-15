import Card from "@/components/ui/Card/Card";
import Link from "next/link";

export default function BlockedPage() {
  return (
    <Card>
      <h1>Compte bloqué</h1>
      <section className="section prose max-w-none min-h-[50vh] flex flex-col gap-8">
        <h2 className="text-2xl mb-8 text-center text-blue3">
          Votre compte est bloqué!
        </h2>
        <div className="flex flex-col justify-center gap-5">
          {" "}
          <p>
            Vous ne pouvez actuellement plus utiliser votre compte pour vous
            connecter. Pour résoudre ce problème, veuillez contacter
            l'administrateur du site.
          </p>
          <p className="text-center">
            Vous pouvez utiliser le formulaire de contact qui se trouve{" "}
            <Link href="/contact">ici.</Link>
          </p>
        </div>
      </section>
    </Card>
  );
}
export const metadata = {
  title: "Compte bloqué",
  description:
    "Votre compte est actuellement bloqué. Contactez l'administrateur pour résoudre ce problème.",
  robots: {
    index: false,
    follow: false,
  },
};
