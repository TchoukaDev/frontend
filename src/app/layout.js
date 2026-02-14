import localFont from "next/font/local";
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

const pacifico = localFont({
  src: "./fonts/pacifico_regular.woff2",
  variable: "--font-pacifico",
  display: "swap",
  preload: true, // ✅ Précharge critique
});

const delius = localFont({
  src: "./fonts/Delius.woff2",
  variable: "--font-delius",
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }) {
  const maintenance = false;

  if (maintenance)
    return (
      <html lang="fr" className={`${pacifico.variable} ${delius.variable}`}>
        <body className="h-screen">
          <BackgroundImage />
          <Header />
          <main className="h-full flex justify-center items-center">
            <section className="section flex justify-center items-center font-semibold">
              Le site est actuellement en maintenance. Nous serons de retour
              très vite!
            </section>
          </main>
        </body>
      </html>
    );

  return (
    <html lang="fr" className={`${pacifico.variable} ${delius.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          #site-loader {
            position: fixed;
            inset: 0;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            transition: opacity 0.4s ease;
          }
          #site-loader.hide {
            opacity: 0;
            pointer-events: none;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.1);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}} />
      </head>
      <body>
        <div id="site-loader" className="hide">
          <div className="spinner"></div>
        </div>
        <AuthProvider>
          <QueryProvider>
            <BackgroundImage />
            <Header />
            <Navbar />
            <main className="grow flex flex-col">{children}</main>

            <Footer />
          </QueryProvider>
        </AuthProvider>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('load', () => {
            const l = document.getElementById('site-loader');
            if (l) {
              l.classList.add('hide');
              setTimeout(() => l.remove(), 400);
            }
          });
        `}} />
      </body>
    </html>
  );
}
