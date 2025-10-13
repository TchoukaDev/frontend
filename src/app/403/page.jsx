import ForbiddenPageClient from "@/components/ForbiddenPageClient/ForbiddenPageClient";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default function ForbiddenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center text-blue3">
          <ClipLoader />
        </div>
      }
    >
      <ForbiddenPageClient />
    </Suspense>
  );
}

// ✅ Métadonnées
export const metadata = {
  title: "Accès refusé - 403",
  description: "Vous n'avez pas l'autorisation d'accéder à cette page.",
  robots: {
    index: false,
    follow: false,
  },
};
