import ClubPage from "@/components/Pages/Club/ClubPage";
import SessionsPage from "@/components/Pages/Sessions/SessionsPage";
import WaterWalkingPage from "@/components/Pages/WaterWalking/WaterWalkingPage";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";
import SponsorsPage from "@/components/Pages/Sponsors/SponsorsPage";

// Mapping slug → composant
const pageComponents = {
  club: ClubPage,
  "marche-aquatique": WaterWalkingPage,
  seances: SessionsPage,
  partenaires: SponsorsPage,
};

// ✅ Métadonnées par slug
const pageMetadata = {
  club: {
    title: "Le Club",
    description:
      "Découvrez Les Randonneurs des Sables du Born, notre histoire, nos animateurs et nos valeurs. Club de marche aquatique à Biscarrosse dans les Landes.",
    openGraph: {
      title: "Le Club - Randonneurs des Sables du Born",
      description: "Notre histoire, nos animateurs et nos valeurs",
      url: "/club",
      // L'image sera héritée du layout.js
    },
  },
  "marche-aquatique": {
    title: "Marche Aquatique Biscarrosse ",
    description:
      "Qu'est-ce que la marche aquatique (longe-côte) ? Découvrez cette activité nautique accessible à tous, ses bienfaits et nos conseils.",
    openGraph: {
      title: "Marche Aquatique Biscarrosse - Longe-Côte",
      description:
        "Découvrez la marche aquatique, ses bienfaits et nos conseils",
      url: "/marche-aquatique",
    },
  },
  seances: {
    title: "Nos Séances",
    description:
      "Horaires, lieux et tarifs de nos séances de marche aquatique. Rejoignez-nous pour des sessions encadrées dans les Landes.",
    openGraph: {
      title: "Nos Séances - Horaires et Tarifs",
      description: "Horaires, lieux et tarifs de nos séances encadrées",
      url: "/seances",
    },
  },
  partenaires: {
    titre: "Nos partenaires",
    description:
      "Les partenaires et sponsors du club avec qui nous partageons des valeurs communes et qui nous aident à nous développer",
    url: "/partenaires",
  },
};

// Composant
export default async function Page({ params }) {
  const { slug } = await params;

  const PageComponent = pageComponents[slug];

  if (!PageComponent) {
    return notFound();
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
