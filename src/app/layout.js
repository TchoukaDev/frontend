import Header from "@/components/Header/Header";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Les randonneurs des sables",
  description: "Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
