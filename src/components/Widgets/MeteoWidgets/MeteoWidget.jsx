// app/components/MeteoWidget/MeteoWidget.jsx
import { Suspense } from "react";
import MeteoWidgetServer from "./MeteoWidgetServer";

// Skeleton à afficher pendant le chargement des données
function MeteoSkeleton() {
  return (
    <div className="animate-pulse text-sand custom-gradient p-2 md:p-3 from-blue3 to-blue1 rounded-2xl border-2 border-blue1 h-20">
      <div className="h-[30px] bg-blue-300 rounded"></div>
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
