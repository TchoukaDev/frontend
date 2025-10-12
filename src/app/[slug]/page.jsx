import ClubPage from "@/components/Pages/Club/ClubPage";
import GalleryPage from "@/components/Pages/Gallery/GalleryPage";
import SessionsPage from "@/components/Pages/Sessions/SessionsPage";
import WaterWalkingPage from "@/components/Pages/WaterWalking/WaterWalkingPage";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// Mapping slug → composant
const pageComponents = {
  club: ClubPage,
  "marche-aquatique": WaterWalkingPage,
  seances: SessionsPage,
  galerie: GalleryPage,
};

// ✅ Métadonnées par slug
const pageMetadata = {
  club: {
    title: "Le Club",
    description:
      "Découvrez Les Randonneurs des Sables du Born, notre histoire, nos animateurs et nos valeurs. Club de marche aquatique dans les Landes.",
    openGraph: {
      images: ["/images/club-og.jpg"],
    },
  },
  "marche-aquatique": {
    title: "Marche Aquatique",
    description:
      "Qu'est-ce que la marche aquatique (longe-côte) ? Découvrez cette activité nautique accessible à tous, ses bienfaits et nos conseils.",
    openGraph: {
      images: ["/images/marche-aquatique-og.jpg"],
    },
  },
  seances: {
    title: "Nos Séances",
    description:
      "Horaires, lieux et tarifs de nos séances de marche aquatique. Rejoignez-nous pour des sessions encadrées dans les Landes.",
    openGraph: {
      images: ["/images/seances-og.jpg"],
    },
  },
  galerie: {
    title: "Galerie Photos",
    description:
      "Photos de nos sorties, événements et activités de marche aquatique. Revivez les meilleurs moments du club.",
    openGraph: {
      images: ["/images/galerie-og.jpg"],
    },
  },
};

// Composant
export default async function Page({ params }) {
  const { slug } = await params;

  const PageComponent = pageComponents[slug];

  if (!PageComponent) {
    return notFound(); // ← Pas de fetch si slug invalide
  }

  const initialData = (await fetchStrapi(`${slug}/optimized`, 300)) || [];

  return <PageComponent initialData={initialData} slug={slug} />;
}

export const revalidate = 300;

// Pour que Next.js génère les pages statiques
export function generateStaticParams() {
  const slugArray = Object.keys(pageComponents).map((slug) => ({
    slug,
  }));

  return slugArray;
}

// ✅ Fonction generateMetadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const metadata = pageMetadata[slug];

  if (!metadata) {
    return {
      title: "Page introuvable",
    };
  }

  return metadata;
}
