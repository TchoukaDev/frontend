import ClubPage from "@/components/Pages/Club/ClubPage";
// import CompetitionsPage from "@/components/Pages/Competitions/CompetitionsPage";
import GalleryPage from "@/components/Pages/Gallery/GalleryPage";
import SessionsPage from "@/components/Pages/Sessions/SessionsPage";
import WaterWalkingPage from "@/components/Pages/WaterWalking/WaterWalking";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// Mapping slug → composant
const pageComponents = {
  club: ClubPage,
  "marche-aquatique": WaterWalkingPage,
  seances: SessionsPage,
  // competitions: CompetitionsPage,
  galerie: GalleryPage,
};
export default async function Page({ params }) {
  const { slug } = await params;

  const PageComponent = pageComponents[slug];

  if (!PageComponent) {
    return notFound(); // ← Pas de fetch si slug invalide
  }

  const response = (await fetchStrapi(`${slug}/optimized`, 300)) || {};
  const data = {
    titreprincipal: "Page en construction",
    titre1: "",
    titre2: "",
    contenu: null,
    animateurs: [], // ✅ TOUJOURS un array !
    ...response?.data?.attributes, // Étendre avec les vraies données si disponibles
  };
  return <PageComponent data={data} />;
}

const revalidate = 300;

// Pour que Next.js génère les pages statiques
export function generateStaticParams() {
  const slugArray = Object.keys(pageComponents).map((slug) => ({
    slug,
  }));

  return slugArray;
}
