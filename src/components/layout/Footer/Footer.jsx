import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-evenly items-center md:items-start custom-gradient p-8 gap-5 text-black font-semibold">
      <div className="flex flex-col items-start justify-items-start gap-5 ">
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
      <div className="flex flex-col md:flex-row justify-evenly gap-5 items-start">
        <div>
          Liens utiles
          <div className="flex flex-col justify-start items-start text-sm mt-4 font-normal">
            <a
              className="footerLink"
              href="https://www.facebook.com/share/18P1oWswhE/"
              target="_blank"
            >
              Facebook
            </a>
            <a
              className="footerLink"
              href="https://randonneursdessables.sportsregions.fr/"
              target="_blank"
            >
              Club les randonneurs des sables
            </a>
            <a
              className="footerLink"
              href="https://randonneursdessables.sportsregions.fr/media/uploaded/sites/2419/document/637b5c180c080_RIMARCHEAQUATIQUE300922.pdf"
              target="_blank"
            >
              Règlement intérieur
            </a>
            <a
              className="footerLink"
              href="https://formation.ffrandonnee.fr/Stages/Index"
              target="_blank"
            >
              Formation : FFRandonnée
            </a>
          </div>
        </div>
        <div>
          Nos partenaires
          <div className="flex flex-col justify-start items-start text-sm mt-4 font-normal">
            <a
              className="footerLink"
              href="http://www.platrerie-segonzac.fr/"
              target="_blank"
            >
              Plâtrerie SEGONZAC
            </a>
            <a
              className="footerLink"
              href="https://mellowsea.com/"
              target="_blank"
            >
              Mellow Sea - La Mer comme Terre de Bien-être
            </a>
            <a
              className="footerLink"
              href="https://longeurs.com/"
              target="_blank"
            >
              Marche Aquatique et Longe Côte - Longeurs -
            </a>
          </div>
        </div>
        <div>
          Compétitions
          <div className="flex flex-col justify-start items-start text-sm mt-4 font-normal">
            <a
              className="footerLink"
              href="https://www.ffrandonnee.fr/Media/Default/Documents/disciplines/longe-cote-marche-aquatique/Calendrier_Nat_Competitions_LongeCote_TLC_Saison23-24_23-12-17.pdf"
              target="_blank"
            >
              Calendrier national 2024/2025
            </a>
            <a
              className="footerLink"
              href="https://ffrandonnee-competitions.fr/LCMA/"
              target="_blank"
            >
              Résultats championnat et classNameement national
            </a>
            <a
              className="footerLink"
              href="https://www.ffrandonnee.fr/disciplines/les-disciplines/reglementation-des-activites-de-marche-et-de-randonnee"
              target="_blank"
            >
              Règlementation sportive
            </a>
            <a
              className="footerLink"
              href="https://www.ffrandonnee.fr/Media/Default/Documents/disciplines/longe-cote-marche-aquatique/Regles_de_participation_aux_qualificatifs_et_CDF_2024.pdf"
              target="_blank"
            >
              Règles de participation aux qualificatifs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
