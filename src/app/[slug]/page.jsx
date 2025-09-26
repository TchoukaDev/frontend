// app/[slug]/page.jsx

import ClubPage from "@/components/Pages/Club/ClubPage";
import CompetitionsPage from "@/components/Pages/Competitions/CompetitionsPage";
import GalleryPage from "@/components/Pages/Gallery/GalleryPage";
import InfosPage from "@/components/Pages/Infos/InfosPage";
import SessionsPage from "@/components/Pages/Sessions/SessionsPage";
import WaterWalkingPage from "@/components/Pages/WaterWalking/WaterWalking";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  // Mapping slug → composant
  const pageComponents = {
    club: ClubPage,
    "marche-aquatique": WaterWalkingPage,
    seances: SessionsPage,
    infos: InfosPage,
    competitions: CompetitionsPage,
    galerie: GalleryPage,
  };

  const PageComponent = pageComponents[slug];

  if (!PageComponent) {
    return notFound(); // ← Pas de fetch si slug invalide
  }

  const data = await fetchStrapi(slug, 300);
  return <PageComponent data={data} />;
}
