"use client";

import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import LoginButton from "./LoginButton";

export default function NavbarClient({ session }) {
  // Variables
  const Path = usePathname();

  const links = [
    ["Accueil", "/"],
    ["Le club", "/club"],
    ["Marche aquatique", "/marche-aquatique"],
    ["Séances", "/seances"],
    ["Actualités du club", "/actualites-club"],
    ["Compétitions", "/competitions", "isAuthenticated"],
    [
      "Section animateurs",
      "/section-animateurs",
      "isAuthenticated",
      "isAnimator",
    ],
    ["Boutique", "/boutique"],
    ["Partenaires", "/partenaires"],
    ["Galerie", "/galerie/"],
  ];

  // State

  // Gère ouverture et fermeture navbar responsive
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref
  const navbarRef = useRef();

  // Hooks
  // Détecter le clic en dehors de la navbar pour la fermer
  useHandleClickOutside(navbarRef, () => setIsMenuOpen(false));

  // Function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-sand font-title shadow-lg shadow-black/40 z-1000 sticky top-0 text-lg"
    >
      <div className=" px-10 xl:px-18">
        <div className="flex justify-start lg:justify-center  items-center py-2 md:py-4 ">
          {/* Menu desktop - caché sur mobile et tablette */}
          <ul className="hidden xl:flex justify-center space-x-7">
            {links.map((link) => {
              if (link[2] === "isAuthenticated" && !session?.user) return null;
              if (
                link[3] === "isAnimator" &&
                session?.user?.role !== "animateur"
              )
                return null;

              return (
                <li key={link[0]}>
                  <Link
                    prefetch={true}
                    href={link[1]}
                    className={`hover:text-blue-700 flex items-center text-center  transition-colors ${
                      Path === link[1] ? "text-blue-700" : "text-blue3"
                    } duration-200`}
                  >
                    {link[0]}
                  </Link>
                </li>
              );
            })}
          </ul>

          {isMenuOpen ? (
            /*Bouton de fermeture du menu mobile */
            <X
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="xl:hidden text-blue3 cursor-pointer hover:text-blue-700 transition-colors duration-200"
            />
          ) : (
            /* Bouton hamburger - visible seulement sur mobile */
            <Menu
              onClick={toggleMenu}
              className="xl:hidden text-blue3 cursor-pointer hover:text-blue-700 transition-colors duration-200"
              aria-label="Toggle menu"
            />
          )}
          <div className="absolute flex gap-3 items-center  right-5">
            <Link
              title="Nous contacter"
              href="/contact"
              className="border-[1.5px] border-blue3 text-blue3 hover:text-blue-700 hover:border-blue-700 transition-all p-1 rounded-lg "
            >
              <Mail
                className="size-4 md:size-[28px] "
                size={30}
                strokeWidth={1}
              />
            </Link>
            <LoginButton session={session} />
          </div>
        </div>

        {/* Menu mobile - coulissant */}
        <ul
          className={`xl:hidden text-center overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          {links.map((link) => {
            if (link[2] === "isAuthenticated" && !session?.user) return null;
            if (link[3] === "isAnimator" && session?.user?.role !== "animateur")
              return null;
            return (
              <li key={link[0]} className="text-sm  py-10md: py-2">
                <Link
                  prefetch={true}
                  href={link[1]}
                  onClick={closeMenu}
                  className={`block hover:text-blue-700 transition-colors ${
                    Path === link[1] ? "text-blue-700" : "text-blue3"
                  } duration-200`}
                >
                  {link[0]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
