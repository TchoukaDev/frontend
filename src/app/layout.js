import Header from "@/components/Header/Header";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import QueryProvider from "@/components/Providers/QueryClientProvider/QueryClientProvider";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Les randonneurs des sables",
  description: "Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
