import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/components/Providers/QueryClientProvider/QueryClientProvider";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundImage from "@/components/ui/BackgroundImage/BackgroundImage";

export const metadata = {
  title: "Les randonneurs des sables",
  description: "Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
          <BackgroundImage />
          <Header />
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
