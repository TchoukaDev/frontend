import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/components/Providers/QueryClientProvider/QueryClientProvider";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundImage from "@/components/ui/BackgroundImage/BackgroundImage";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";
import { siteConfig } from "@/utils/siteConfig";

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: "%s | " + siteConfig.siteName, // ✅ Template pour les pages enfants
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  authors: [{ name: siteConfig.author }],

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: siteConfig.name, // on peut ajouter un titre spécifique si besoin
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.seoDefaults.image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.description}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.seoDefaults.image],
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

export const viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
            <main>{children}</main>

            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
