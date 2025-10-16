// app/components/MeteoWidget/MeteoWidget.jsx
import { Suspense } from "react";
import MeteoWidgetServer from "./MeteoWidgetServer";
import { ClipLoader } from "react-spinners";

// Skeleton à afficher pendant le chargement des données
function MeteoSkeleton() {
  return (
    <div className="animate-pulse text-sand custom-gradient p-2 md:p-3  rounded-2xl border-2 border-blue1 h-20">
      <div className="h-[30px] rounded">
        <ClipLoader size={40}></ClipLoader>
      </div>
    </div>
  );
}

export default function MeteoWidget() {
  return (
    <Suspense fallback={<MeteoSkeleton />}>
      <MeteoWidgetServer />
    </Suspense>
  );
}
