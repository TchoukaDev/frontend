import MeteoWidget from "@/components/Widgets/MeteoWidgets/MeteoWidget";
import { FaFacebook } from "react-icons/fa";

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
        <div className="flex flex-col justify-between gap-15 items-center mt-5 h-full  ">
          <div className=" md:flex-row gap-5 flex items-center justify-between flex-[1] w-[90%]">
            {/* Meteo */}
            <MeteoWidget />

            {/* Date */}
            <div className="custom-gradient p-2 md:p-3 text-sand from-blue3 to-blue1  text-center rounded-xl border-2 text-sm md:text-lg font-title border-blue1 relative">
              {dateFr}
            </div>
          </div>
          {/* Bienvenue mobile */}
          <div className="flex justify-center top-2/3 bottom-1/3 w-full left-1/2 right-1/2 flex-[2]  items-start">
            <span className="animateLetter">B</span>
            <span className="animateLetter">i</span>
            <span className="animateLetter">e</span>
            <span className="animateLetter">n</span>
            <span className="animateLetter">v</span>
            <span className="animateLetter">e</span>
            <span className="animateLetter">n</span>
            <san className="animateLetter">u</san>
            <span className="animateLetter">e</span>
          </div>
        </div>{" "}
      </section>

      {/* Facebook */}
      <section>
        <p className=" bg-sand p-5 text-blue3 text-sm md:text-base text-center shadowcustom">
          Suivez-nous également sur notre page Facebook
          <span className="mx-3">
            <a
              href="https://www.facebook.com/MarcheAquatiqueRandonneursdesSablesduBorn?rdid=E5WJVwjnkM2lS6lA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18P1oWswhE%2F#"
              target="_blank"
            >
              <FaFacebook className="text-3xl inline-block transform hover:scale-110 duration-200" />
            </a>
          </span>
        </p>
      </section>
    </>
  );
}
