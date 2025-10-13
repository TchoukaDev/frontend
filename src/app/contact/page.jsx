import ContactForm from "@/components/Forms/ContactForm/ContactForm";
import Card from "@/components/ui/Card/Card";

export default function Contact() {
  return (
    <Card>
      <h1>Contact</h1>
      <section className="section">
        <p className="text-center font-semibold mb-3 text-lg">
          Si vous avez des questions concernant notre activité, n'hésitez pas à
          nous écrire via le formulaire suivant:
        </p>
        <ContactForm />
      </section>
    </Card>
  );
}

export const metadata = {
  title: "Contact",
  description:
    "Contactez Les Randonneurs des Sables du Born pour toute question sur nos activités de marche aquatique à Biscarrosse. Nous vous répondons rapidement.",

  // ✅ Mots-clés
  keywords: [
    "contact",
    "marche aquatique Biscarrosse",
    "longe-côte",
    "Randonneurs des Sables",
    "question",
    "renseignement",
  ],

  // ✅ OpenGraph simplifié
  openGraph: {
    title: "Contactez-nous - Randonneurs des Sables du Born",
    description:
      "Une question sur nos activités de marche aquatique ? Nous sommes là pour vous répondre.",
    url: "/contact",
    type: "website",
    // ❌ Pas d'image spécifique = héritage du layout.js
  },

  // ✅ Twitter Card
  twitter: {
    card: "summary",
    title: "Contactez-nous",
    description: "Une question ? Nous sommes là pour vous répondre.",
  },

  // ✅ URL canonique (relative, pas absolue)
  alternates: {
    canonical: "/contact",
  },

  // ✅ Robots
  robots: {
    index: true,
    follow: true,
  },
};
