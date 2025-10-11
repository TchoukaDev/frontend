import { fetchStrapi } from "@/utils/fetchStrapi";
import Link from "next/link";
import Accordion from "./Accordion";

export default async function Footer() {
  const initialData = await fetchStrapi("pied-de-page/optimized", 300);

  return (
    <footer className="flex flex-col md:flex-row justify-evenly items-center md:items-start custom-gradient py-8 px-16 gap-3 text-xs md:text-sm text-black">
      <div className="flex flex-col w-2/3 md:w-1/3 gap-3 font-semibold">
        {/* Liens internes */}
        <Link className="footerLink" href="/contact">
          Contact
        </Link>
        <Link className="footerLink" href="/legal">
          Mentions légales
        </Link>
        <Link className="footerLink" href="/privacy">
          Politique de confidentialité
        </Link>
        <Link className="footerLink" href="/terms">
          Conditions générales d'utilisation
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-1 w-2/3 ">
        {/* Liens externes colonne 1 */}

        <Accordion initialData={initialData} titleData="1" linksData="1" />

        {/* Liens externes colonne 2 */}
        <Accordion initialData={initialData} titleData="2" linksData="2" />
      </div>
    </footer>
  );
}
