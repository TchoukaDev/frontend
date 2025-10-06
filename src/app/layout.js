import Header from "@/components/layout/Header/Header";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import QueryProvider from "@/components/Providers/QueryClientProvider/QueryClientProvider";
import Footer from "@/components/layout/Footer/Footer";
import BackgroundImage from "@/components/ui/BackgroundImage/BackgroundImage";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";

export const metadata = {
  title: "Les randonneurs des sables",
  description: "Site",
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
