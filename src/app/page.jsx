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
      <section className="h-full relative">
        <div className="flex flex-col gap-5 justify-start items-center min-h-[80vh] mt-5 ">
          <div className="flex-col md:flex-row gap-5 flex items-center justify-between w-[90%]">
            {/* Meteo */}
            <MeteoWidget />

            {/* Date */}
            <div className="custom-gradient p-3 text-sand from-blue3 to-blue1 grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] text-center rounded-xl border-2 text-lg font-semibold border-blue1 relative">
              {dateFr}
            </div>
          </div>
          {/* Bienvenue mobile */}
          <div className="flex grow items-center md:hidden">
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
        </div>{" "}
        {/* Bienvenue desktop */}
        <div className="hidden absolute top-1/2 bottom-1/2 left-1/2 right-1/2 md:flex justify-center grow items-center ">
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
      </section>

      {/* Facebook */}
      <section>
        <p className=" bg-sand p-5 text-blue3 flex justify-center items gap-3 shadowcustom">
          Suivez-nous également sur notre page Facebook
          <a
            href="https://www.facebook.com/MarcheAquatiqueRandonneursdesSablesduBorn?rdid=E5WJVwjnkM2lS6lA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18P1oWswhE%2F#"
            target="_blank"
          >
            <FaFacebook className="text-3xl transform hover:scale-110 duration-200" />
          </a>
        </p>
      </section>
    </>
  );
}
