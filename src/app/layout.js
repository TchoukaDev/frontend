import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/components/Providers/QueryClientProvider/QueryClientProvider";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundImage from "@/components/ui/BackgroundImage/BackgroundImage";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";

export const metadata = {
  metadataBase: new URL("https://les-randonneurs-des-sables.fr"),

  title: {
    default: "Les Randonneurs des Sables du Born - Marche Aquatique",
    template: "%s | Les Randonneurs des Sables", // ✅ Template pour les pages enfants
  },

  description:
    "Club de marche aquatique et longe-côte dans les Landes. Découvrez nos animations, événements et rejoignez-nous pour des activités en plein air.",

  keywords: [
    "marche aquatique",
    "longe-côte",
    "Landes",
    "Born",
    "club sportif",
    "activités nautiques",
  ],

  authors: [{ name: "Les Randonneurs des Sables" }],

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Les Randonneurs des Sables du Born",
    images: [
      {
        url: "/images/og-default.jpg", // Image par défaut
        width: 1200,
        height: 630,
        alt: "Les Randonneurs des Sables du Born",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <QueryProvider>
            <BackgroundImage />
            <Header />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
