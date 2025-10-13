// ================================
// 🧾 CONFIGURATION GLOBALE DU SITE
// ================================

// Pour metadata du layout, politique de confidentialité, informations générales et informations légales
export const siteConfig = {
  // 🔹 Informations générales
  name: "Les Randonneurs des Sables du Born",
  siteName: "Les Randonneurs des Sables du Born",
  description:
    "Club de marche aquatique et longe-côte dans les Landes. Découvrez nos animations, événements et rejoignez-nous pour des activités conviviales en milieu lacustre.",
  url: process.env.NEXT_PUBLIC_URL,
  author: "Les Randonneurs des Sables du Born",
  keywords: [
    "marche aquatique",
    "longe-côte",
    "Landes",
    "Biscarrosse",
    "Sanguinet",
    "Parentis",
    "Born",
    "club sportif",
    "activités nautiques",
  ],
  language: "fr",
  locale: "fr_FR",
  themeColor: "#41c9e2", // utile pour les navigateurs mobiles
  updated: "12 octobre 2025", // date de dernière mise à jour (pour CGU et politique)

  // 🔹 Informations légales
  legal: {
    responsable: "Alain WIRTH",
    entreprise: "Les randonneurs des Sables",
    adresse: "Mairie de Biscarrosse: 149 Av. du 14 Juillet, 40600 Biscarrosse",
    email: "randoduborn@gmail.com",
    telephone: "06 81 99 37 18",
    juridiction: "Dax", // pour les CGU
  },

  // 🔹 Hébergement
  hosting: {
    hebergeur: "Vercel Inc.",
    adresse: "440 N Barranca Avenue #4133, Covina, CA 91723",
    pays: "Etats-Unis",
    site: "https://www.vercel.com/",
  },

  // 🔹 Réseaux sociaux (facultatif, utile pour Open Graph)
  social: {
    facebook:
      "https://www.facebook.com/MarcheAquatiqueRandonneursdesSablesduBorn",
  },

  // 🔹 SEO par défaut (OpenGraph & Twitter)
  seoDefaults: {
    image: "/images/og-default.jpg",
    type: "website",
    robots: "index, follow",
  },
};
