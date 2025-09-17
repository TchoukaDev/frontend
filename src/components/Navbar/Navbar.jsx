"use client";

import { useHandleClickOutside } from "@/hooks/handleClickOutside";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export default function Navbar() {
  // Variables
  const Path = usePathname();
  console.log(Path);
  // State
  // Gère ouverture et fermeture navbar responsive
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref
  const navbarRef = useRef();
  // Hook
  // Détecter le clic en dehors de la navbar pour la fermer
  useHandleClickOutside(navbarRef, () => setIsMenuOpen(false));

  const links = [
    ["Accueil", "/"],
    ["Présentation", "/presentation"],
    ["Marche aquatique", "/waterWalking"],
    ["Séances", "/sessions"],
    ["Informations", "/infos"],
    ["Compétitions", "/competitions"],
    ["Galerie", "/gallery/"],
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-sand font-title shadow-lg shadow-black/40  relative text-lg"
    >
      <div className=" px-10 lg:px-18">
        <div className="flex justify-between items-center py-4">
          {/* Menu desktop - caché sur mobile */}
          <ul className="hidden lg:flex space-x-7">
            {links.map((link) => (
              <li key={link[0]}>
                <Link
                  href={link[1]}
                  className={`hover:text-blue-600 transition-colors ${
                    Path === link[1] ? "text-blue3" : "text-blue2"
                  } duration-200`}
                >
                  {link[0]}
                </Link>
              </li>
            ))}
          </ul>

          {isMenuOpen ? (
            /*Bouton de fermeture du menu mobile */
            <X
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="lg:hidden text-blue2 cursor-pointer hover:text-blue3 transition-colors duration-200"
            />
          ) : (
            /* Bouton hamburger - visible seulement sur mobile */
            <Menu
              onClick={toggleMenu}
              className="lg:hidden text-blue2 cursor-pointer hover:text-blue3 transition-colors duration-200"
              aria-label="Toggle menu"
            />
          )}
          <div>
            {/* Bouton de connexion */}
            <Link
              className="bg-sand p-2  border border-blue3 hover:border-sand rounded-lg hover:bg-blue3 text-blue3 text-center  hover:text-sand transition-all duration-200 cursor-pointer;"
              href="/signin"
            >
              Connexion
            </Link>
          </div>
        </div>

        {/* Menu mobile - coulissant */}
        <ul
          className={`lg:hidden text-center overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          {links.map((link) => (
            <li key={link[0]} className="py-2">
              <Link
                href={link[1]}
                onClick={closeMenu}
                className={`block hover:text-blue-600 transition-colors ${
                  Path === link[1] ? "text-blue3" : "text-blue2"
                } duration-200`}
              >
                {link[0]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
