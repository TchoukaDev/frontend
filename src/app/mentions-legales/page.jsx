import Card from "@/components/ui/Card/Card";
import { siteConfig } from "@/utils/siteConfig";

export const metadata = {
  title: "Mentions légales",
  description: `Informations légales concernant ${siteConfig.name} : éditeur, hébergement, propriété intellectuelle et contact.`,

  // ✅ Mots-clés
  keywords: [
    "mentions légales",
    "informations légales",
    "éditeur du site",
    "hébergement",
    siteConfig.name,
  ],

  // ✅ OpenGraph
  openGraph: {
    title: `Mentions légales - ${siteConfig.name}`,
    description: "Informations légales sur l'éditeur et l'hébergeur du site",
    url: "/mentions-legales",
    type: "website",
  },

  // ✅ Robots - Page légale = indexable
  robots: {
    index: true, // ✅ Indexer (page légale importante)
    follow: true,
  },

  // ✅ URL canonique
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function LegalNoticePage() {
  const { legal, hosting } = siteConfig;

  return (
    <Card>
      <h1>Mentions légales</h1>

      <section className="section prose max-w-none mx-auto space-y-8">
        {/* --- ÉDITEUR DU SITE --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap mt-0">
            1. Éditeur du site
          </h2>
          <p className="mb-2">
            Le site <strong>"{siteConfig.name}"</strong> est édité par :
          </p>
          <ul className="list-none space-y-1 md:ml-4">
            <li>
              <strong>Nom de l'association :</strong> {siteConfig.name}
            </li>
            <li>
              <strong>Responsable de publication :</strong> {legal.responsable}
            </li>
            <li>
              <strong>Adresse :</strong> {legal.adresse}
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${legal.email}`} className="link">
                {legal.email}
              </a>
            </li>
            <li>
              <strong>Téléphone :</strong>{" "}
              <a href={`tel:${legal.telephone}`} className="link">
                {legal.telephone}
              </a>
            </li>
          </ul>
        </section>

        {/* --- HÉBERGEMENT --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            2. Hébergement
          </h2>
          <p className="mb-2">Le site est hébergé par :</p>
          <ul className="list-disc space-y-1 md:ml-4">
            <li>
              <strong>Hébergeur :</strong> {hosting?.hebergeur || "Vercel Inc."}
            </li>
            <li>
              <strong>Adresse :</strong>{" "}
              {hosting?.adresse || "340 S Lemon Ave #4133, Walnut, CA 91789"}
            </li>
            <li>
              <strong>Pays :</strong> {hosting?.pays || "États-Unis"}
            </li>
            {hosting?.siteWeb && (
              <li>
                <strong>Site web :</strong>{" "}
                <a
                  href={hosting.siteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {hosting.siteWeb}
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* --- DIRECTEUR DE PUBLICATION --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            3. Directeur de publication
          </h2>
          <p>
            Le directeur de la publication du site est :{" "}
            <strong>{legal.responsable}</strong>
          </p>
        </section>

        {/* --- PROPRIÉTÉ INTELLECTUELLE --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            4. Propriété intellectuelle
          </h2>
          <p className="mb-3">
            L'ensemble des éléments présents sur le site (textes, images, logo,
            graphismes, vidéos, icônes, mise en page, etc.) sont la propriété
            exclusive de <strong>{siteConfig.name}</strong>, sauf mention
            contraire.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable de l'éditeur.
          </p>
        </section>

        {/* --- CRÉDITS --- */}
        {siteConfig.credits && (
          <section>
            <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
              5. Crédits
            </h2>
            <ul className="list-none space-y-1 md:ml-4">
              {siteConfig.credits.photos && (
                <li>
                  <strong>Photos :</strong> {siteConfig.credits.photos}
                </li>
              )}
              {siteConfig.credits.design && (
                <li>
                  <strong>Design :</strong> {siteConfig.credits.design}
                </li>
              )}
              {siteConfig.credits.developpement && (
                <li>
                  <strong>Développement :</strong>{" "}
                  {siteConfig.credits.developpement}
                </li>
              )}
            </ul>
          </section>
        )}

        {/* --- RESPONSABILITÉ --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "6" : "5"}. Responsabilité
          </h2>
          <p className="mb-3">
            <strong>{siteConfig.name}</strong> s'efforce d'assurer l'exactitude
            et la mise à jour des informations diffusées sur ce site. Toutefois,
            il ne peut garantir l'exactitude, la précision ou l'exhaustivité des
            informations mises à disposition.
          </p>
          <p>
            En conséquence, l'éditeur décline toute responsabilité pour toute
            imprécision, inexactitude ou omission portant sur des informations
            disponibles sur le site.
          </p>
        </section>

        {/* --- LIENS EXTERNES --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "7" : "6"}. Liens externes
          </h2>
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites web.{" "}
            <strong>{siteConfig.name}</strong> n'exerce aucun contrôle sur ces
            sites et décline toute responsabilité quant à leur contenu, leur
            disponibilité ou leurs pratiques en matière de protection des
            données.
          </p>
        </section>

        {/* --- DONNÉES PERSONNELLES --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "8" : "7"}. Données personnelles
          </h2>
          <p>
            Pour toute information sur la collecte et le traitement des données
            personnelles, veuillez consulter notre{" "}
            <a href="/politique-de-confidentialite" className="link">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        {/* --- COOKIES --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "9" : "8"}. Cookies
          </h2>
          <p>
            Le site peut utiliser des cookies pour améliorer l'expérience
            utilisateur. Pour en savoir plus, consultez notre{" "}
            <a href="/politique-cookies" className="link">
              politique de cookies
            </a>
            .
          </p>
        </section>

        {/* --- DROIT APPLICABLE --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "10" : "9"}. Droit applicable et juridiction
          </h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige et à défaut d'accord amiable, le litige sera porté
            devant les tribunaux français compétents.
          </p>
        </section>

        {/* --- CONTACT --- */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            {siteConfig.credits ? "11" : "10"}. Contact
          </h2>
          <p className="mb-3">
            Pour toute question concernant les mentions légales du site ou pour
            exercer vos droits, vous pouvez nous contacter :
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border">
            <strong>{legal.responsable}</strong>
            <br />
            {legal.adresse}
            <br />
            Email :{" "}
            <a href={`mailto:${legal.email}`} className="link">
              {legal.email}
            </a>
            <br />
            Téléphone :{" "}
            <a href={`tel:${legal.telephone}`} className="link">
              {legal.telephone}
            </a>
          </div>
        </section>
        <p className="border-t pt-6 mt-10 text-sm text-gray-600">
          Ces mentions légales ont été mises à jour le{" "}
          {siteConfig.updated || "12 octobre 2025"} et peuvent être modifiées à
          tout moment.
        </p>
      </section>
    </Card>
  );
}
