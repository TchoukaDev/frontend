import Card from "@/components/ui/Card/Card";
import { siteConfig } from "@/utils/siteConfig";

export const metadata = {
  title: "Politique de confidentialité",
  description: `Découvrez comment ${siteConfig.name} collecte, utilise et protège vos données personnelles conformément au RGPD.`,

  // ✅ Mots-clés
  keywords: [
    "politique de confidentialité",
    "RGPD",
    "protection des données",
    "données personnelles",
    "vie privée",
    siteConfig.name,
  ],

  // ✅ OpenGraph
  openGraph: {
    title: `Politique de confidentialité - ${siteConfig.name}`,
    description:
      "Comment nous collectons, utilisons et protégeons vos données personnelles",
    url: "/politique-de-confidentialite",
    type: "website",
  },

  // ✅ Robots
  robots: {
    index: true, // ✅ Indexer (page légale importante)
    follow: true,
  },

  // ✅ URL canonique
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
};

export default function PrivacyPolicy() {
  const { legal } = siteConfig;

  return (
    <Card>
      <h1>Politique de confidentialité</h1>
      <section className="section prose max-w-none mx-auto">
        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap mt-0">
            1. Collecte des données
          </h2>
          <p>
            Nous collectons uniquement les informations nécessaires pour vous
            fournir nos services ou pour répondre à vos demandes via notre site
            ({siteConfig.url}), par exemple votre nom et votre adresse email
            lorsque vous utilisez nos formulaires de contact ou newsletters.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            2. Utilisation des données
          </h2>
          <p>Les données collectées sont utilisées uniquement pour :</p>
          <ul className="list-disc ml-0 md:ml-6 mt-2">
            <li>Vous répondre suite à vos demandes</li>
            <li>Gérer les inscriptions aux activités ou événements du club</li>
            <li>Améliorer nos services et communications</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            3. Durée de conservation
          </h2>
          <p>
            Les données personnelles sont conservées tant que nécessaire pour
            fournir nos services et respecter nos obligations légales. Vous
            pouvez demander leur suppression à tout moment en nous contactant.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            4. Droits des utilisateurs
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc ml-0 md:ml-6 mt-2">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à la suppression (droit à l'oubli)</li>
            <li>Droit de limitation du traitement et d'opposition</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href={`mailto:${legal.email}`} className="link">
              {legal.email}
            </a>
            .
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            5. Partage des données
          </h2>
          <p>
            Nous ne vendons, louons ni ne partageons vos données personnelles
            avec des tiers, sauf pour respecter la loi ou dans le cadre de
            services indispensables au fonctionnement du site (hébergement,
            newsletter).
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            6. Sécurité
          </h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            pour protéger vos données contre tout accès non autorisé,
            modification ou divulgation.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            7. Cookies
          </h2>
          <p>
            Notre site peut utiliser des cookies pour améliorer votre
            expérience.{" "}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg md:text-xl mb-2 text-blue3 whitespace-pre-wrap">
            8. Contact
          </h2>
          <p className="mb-3">
            Pour toute question sur vos données ou cette politique, contactez
            :{" "}
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
        </div>

        <p className="border-t pt-4 mt-8 text-sm text-gray-600">
          Cette politique peut être mise à jour ponctuellement. Nous vous
          recommandons de la consulter régulièrement. Dernière mise à jour :{" "}
          {siteConfig.updated}
        </p>
      </section>
    </Card>
  );
}
