import MeteoWidget from "@/components/Widgets/MeteoWidgets/MeteoWidget";
import { FaFacebook } from "react-icons/fa";

// ✅ Métadonnées complètes pour la page d'accueil
export const metadata = {
  title: "Accueil",
  description:
    "Bienvenue au club de marche aquatique Les Randonneurs des Sables du Born. Découvrez nos activités, animations et événements dans les Landes.",

  openGraph: {
    title: "Les Randonneurs des Sables du Born - Marche Aquatique",
    description:
      "Club de marche aquatique et longe-côte à Biscarrosse. Rejoignez-nous pour des randonnées conviviales dans les Landes.",
    url: "/",
    // L'image sera héritée du layout.js
  },

  // ✅ Bonus : mots-clés pour l'accueil
  keywords: [
    "marche aquatique",
    "longe-côte",
    "Biscarrosse",
    "Born",
    "Landes",
    "randonnée aquatique",
    "sport nautique",
    "club sport Biscarrosse",
  ],
};

export default function Home() {
  const date = new Date();
  const dateFr = date.toLocaleString("fr-Fr", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      {/* Section principale */}
      <section className="h-[40vh] grow sm:h-[50vh] md:h-[60vh] min-h-[270px]">
        <div className="flex flex-col justify-between gap-15 items-center mt-5 h-full">
          <div className="md:flex-row gap-5 flex items-center justify-between flex-[1] w-[90%]">
            {/* Meteo */}
            <MeteoWidget />

            {/* Date */}
            <div className="custom-gradient p-2 md:p-3 text-sand from-blue3 to-blue1 text-center rounded-xl border-2 text-sm md:text-lg font-title border-blue1 relative">
              {dateFr}
            </div>
          </div>

          {/* Bienvenue mobile */}
          <div className="flex justify-center top-2/3 bottom-1/3 w-full left-1/2 right-1/2 flex-[2] items-start">
            <span className="animateLetter">B</span>
            <span className="animateLetter">i</span>
            <span className="animateLetter">e</span>
            <span className="animateLetter">n</span>
            <span className="animateLetter">v</span>
            <span className="animateLetter">e</span>
            <span className="animateLetter">n</span>
            <span className="animateLetter">u</span>
            <span className="animateLetter">e</span>
          </div>
        </div>
      </section>

      {/* Facebook */}
      <section>
        <p className="bg-sand p-5 text-blue3 text-sm md:text-base text-center shadowcustom">
          Suivez-nous également sur notre page Facebook
          <span className="mx-3">
            <a
              href="https://www.facebook.com/MarcheAquatiqueRandonneursdesSablesduBorn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitez notre page Facebook"
            >
              <FaFacebook className="text-3xl inline-block transform hover:scale-110 duration-200" />
            </a>
          </span>
        </p>
      </section>
    </>
  );
}
