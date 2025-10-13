import Card from "@/components/ui/Card/Card";
import { siteConfig } from "@/utils/siteConfig";

export const metadata = {
  title: "Conditions Générales d'Utilisation",
  description: `Conditions générales d'utilisation du site ${siteConfig.name}. Découvrez les règles d'utilisation, vos droits et obligations.`,

  // ✅ Mots-clés
  keywords: [
    "CGU",
    "conditions générales",
    "conditions d'utilisation",
    "règles d'utilisation",
    "mentions légales",
    siteConfig.name,
  ],

  // ✅ OpenGraph
  openGraph: {
    title: `Conditions Générales d'Utilisation - ${siteConfig.name}`,
    description: "Règles et conditions d'utilisation du site",
    url: "/cgu",
    type: "website",
  },

  // ✅ Robots
  robots: {
    index: true, // ✅ Indexer (page légale importante)
    follow: true,
  },

  // ✅ URL canonique
  alternates: {
    canonical: "/cgu",
  },
};

export default function CGU() {
  const { legal } = siteConfig;

  return (
    <Card>
      <h1>Conditions Générales d'Utilisation (CGU)</h1>

      <section className="space-y-8 section max-w-none prose mx-auto">
        {/* Section 1 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap mt-0">
            1. Objet
          </h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) définissent
            les règles d'accès et d'utilisation du site internet{" "}
            <strong>{siteConfig.name}</strong> accessible à l'adresse{" "}
            <a href={siteConfig.url} className="link">
              {siteConfig.url}
            </a>
            .
          </p>
          <p className="mt-2">
            En accédant au site, vous acceptez sans réserve les présentes CGU.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce
            site.
          </p>
        </section>
        {/* Section 2 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            2. Accès au site
          </h2>
          <p className="mb-2">
            L'accès au site est gratuit pour tous les utilisateurs disposant
            d'un accès internet. Certaines sections du site peuvent nécessiter
            une inscription préalable.
          </p>
          <p>
            Nous nous réservons le droit de modifier, suspendre ou interrompre
            l'accès au site, en tout ou partie, temporairement ou
            définitivement, sans préavis et sans que notre responsabilité puisse
            être engagée.
          </p>
        </section>
        {/* Section 3 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            3. Propriété intellectuelle
          </h2>
          <p className="mb-2">
            L'ensemble des contenus présents sur le site (textes, images, logos,
            vidéos, graphismes, sons, logiciels, mise en page, etc.) est la
            propriété exclusive de <strong>{siteConfig.name}</strong> ou de ses
            partenaires, et est protégé par les lois françaises et
            internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            transmission, dénaturation, totale ou partielle du site ou de son
            contenu, par quelque procédé que ce soit, et sur quelque support que
            ce soit, est interdite sans l'autorisation écrite préalable de
            l'éditeur.
          </p>
        </section>
        {/* Section 4 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            4. Compte utilisateur
          </h2>
          <p className="mb-2">
            Certaines fonctionnalités du site nécessitent la création d'un
            compte utilisateur. Vous êtes responsable de :
          </p>
          <ul className="list-disc ml-1: md:ml-6 space-y-1">
            <li>La confidentialité de vos identifiants de connexion</li>
            <li>La véracité des informations fournies lors de l'inscription</li>
            <li>Toutes les activités effectuées depuis votre compte</li>
          </ul>
          <p className="mt-2">
            En cas de suspicion d'utilisation frauduleuse de votre compte, vous
            devez nous en informer immédiatement.
          </p>
        </section>
        {/* Section 5 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            5. Obligations de l'utilisateur
          </h2>
          <p className="mb-2">L'utilisateur s'engage à :</p>
          <ul className="list-disc ml-1 md:ml-6 space-y-1">
            <li>
              Utiliser le site conformément à sa destination et de manière
              loyale
            </li>
            <li>Ne pas porter atteinte aux droits de tiers</li>
            <li>
              Ne pas diffuser de contenus illicites, diffamatoires, injurieux ou
              contraires à l'ordre public
            </li>
            <li>
              Ne pas tenter d'accéder de manière non autorisée au système
              informatique du site
            </li>
            <li>Respecter les droits de propriété intellectuelle</li>
          </ul>
        </section>
        {/* Section 6 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            6. Données personnelles
          </h2>
          <p>
            Pour toute information sur la collecte, l'utilisation et la
            protection de vos données personnelles, veuillez consulter notre{" "}
            <a href="/politique-de-confidentialite" className="link">
              Politique de confidentialité
            </a>{" "}
            conforme au RGPD.
          </p>
        </section>
        {/* Section 7 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            7. Cookies
          </h2>
          <p>
            Le site utilise des cookies pour améliorer l'expérience utilisateur.
          </p>
        </section>
        {/* Section 8 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            8. Responsabilité et garanties
          </h2>
          <p className="mb-3">
            <strong>{siteConfig.name}</strong> met tout en œuvre pour fournir
            des informations fiables et à jour. Toutefois, nous ne pouvons
            garantir l'exactitude, la complétude ou l'actualité des informations
            diffusées sur le site.
          </p>
          <p className="mb-3">
            L'utilisateur reconnaît utiliser le site à ses propres risques. Nous
            déclinons toute responsabilité en cas de :
          </p>
          <ul className="list-disc ml-1 md:ml-6 space-y-1">
            <li>Interruption ou dysfonctionnement du site</li>
            <li>
              Dommages directs ou indirects résultant de l'utilisation du site
            </li>
            <li>Intrusion malveillante ou virus informatique</li>
            <li>Utilisation frauduleuse par un tiers de votre compte</li>
          </ul>
        </section>
        {/* Section 9 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            9. Liens externes
          </h2>
          <p>
            Le site peut contenir des liens hypertextes vers d'autres sites
            internet. <strong>{siteConfig.name}</strong> n'exerce aucun contrôle
            sur ces sites tiers et décline toute responsabilité concernant leur
            contenu, leur disponibilité ou leurs pratiques en matière de
            protection des données.
          </p>
        </section>
        {/* Section 10 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            10. Modification des CGU
          </h2>
          <p>
            Nous nous réservons le droit de modifier les présentes CGU à tout
            moment. Les nouvelles conditions prendront effet dès leur
            publication sur le site. Il est de la responsabilité de
            l'utilisateur de consulter régulièrement les CGU pour prendre
            connaissance des éventuelles modifications.
          </p>
          <p className="mt-2">
            L'utilisation continue du site après modification des CGU vaut
            acceptation des nouvelles conditions.
          </p>
        </section>
        {/* Section 11 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            11. Droit applicable et juridiction
          </h2>
          <p className="mb-2">
            Les présentes CGU sont régies par le droit français. En cas de
            litige relatif à l'interprétation ou à l'exécution des présentes, et
            à défaut d'accord amiable, compétence expresse est attribuée aux
            tribunaux français compétents.
          </p>
        </section>
        {/* Section 12 */}
        <section>
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            12. Contact
          </h2>
          <p className="mb-3">
            Pour toute question concernant les présentes CGU ou pour exercer vos
            droits, vous pouvez nous contacter :
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
          Ces Conditions Générales d'Utilisation ont été mises à jour le{" "}
          {siteConfig.updated}. En continuant à utiliser le site après cette
          date, vous acceptez les présentes CGU dans leur version la plus
          récente. Dernière mise à jour : {siteConfig.updated}
        </p>
      </section>
    </Card>
  );
}
