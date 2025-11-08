"use client";

import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { Mail, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import LoginButton from "./LoginButton";
import { AnimatePresence, motion } from "framer-motion";

export default function NavbarClient({ session }) {
  // --- Variables et hooks ---
  const Path = usePathname();
  const navbarRef = useRef();

  // --- États ---
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menu mobile
  const [openSubmenu, setOpenSubmenu] = useState(null); // sous-menu actif sur mobile

  // --- Fermer le menu quand on clique en dehors ---
  useHandleClickOutside(navbarRef, () => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  });

  // --- Données des liens principaux et sous-menus ---
  const links = [
    { label: "Accueil", href: "/" },
    {
      label: "À propos",
      submenu: [
        { label: "Le club", href: "/club" },
        { label: "Partenaires", href: "/partenaires" },
      ],
    },
    {
      label: "Activités",
      submenu: [
        { label: "Marche aquatique", href: "/marche-aquatique" },
        { label: "Séances", href: "/seances" },
        { label: "Compétitions", href: "/competitions", requiresAuth: true },
      ],
    },
    {
      label: "Infos",
      submenu: [
        { label: "Informations diverses", href: "/infos-diverses" },
        { label: "Actualités du club", href: "/actualites-club" },
        {
          label: "Section animateurs",
          href: "/section-animateurs",
          requiresAuth: true,
          requiresRole: "animateur",
        },
      ],
    },
    { label: "Boutique", href: "/boutique" },
    { label: "Galerie", href: "/galerie" },
  ];

  // --- Fonctions utilitaires ---
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  // ===================================================
  // ===============     COMPOSANT JSX     ===============
  // ===================================================

  return (
    <nav
      ref={navbarRef}
      className="bg-sand font-title shadow-lg shadow-black/40 z-1000 sticky top-0 text-lg"
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="px-10 xl:px-18">
        <div className="flex justify-start lg:justify-center items-center py-2 md:py-4">
          {/* ===================================================
               MENU DESKTOP (visible à partir de xl)
             =================================================== */}
          <ul className="hidden xl:flex justify-center space-x-7">
            {links.map((link) => {
              // Vérifie les conditions d'accès
              if (link.requiresAuth && !session?.user) return null;
              if (
                link.requiresRole === "animateur" &&
                session?.user?.role !== "animateur"
              )
                return null;

              // Si le lien contient un sous-menu
              if (link.submenu) {
                return (
                  <li key={link.label} className="relative group">
                    <button
                      aria-haspopup="true"
                      aria-expanded="false"
                      className={`flex items-center text-blue3 hover:text-blue-700 transition-colors duration-200  ${link.submenu.some((e) => Path === e.href) ? "!text-blue-700" : ""}`}
                    >
                      {link.label}
                      <ChevronDown
                        className="ml-1 size-4 transition-transform group-hover:rotate-180"
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Sous-menu déroulant */}
                    <ul
                      className="absolute left-0   hidden group-hover:block bg-sand shadow-md rounded-lg py-2 w-56"
                      role="menu"
                    >
                      {link.submenu.map((sublink) => {
                        if (sublink.requiresAuth && !session?.user) return null;
                        if (
                          sublink.requiresRole === "animateur" &&
                          session?.user?.role !== "animateur"
                        )
                          return null;
                        return (
                          <li key={sublink.label}>
                            <Link
                              prefetch={true}
                              href={sublink.href}
                              className={`block px-4 py-2 text-base text-blue3 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                                Path === sublink.href ? "!text-blue-700" : ""
                              }`}
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              // Sinon, lien simple
              return (
                <li key={link.label}>
                  <Link
                    prefetch={true}
                    href={link.href}
                    className={`hover:text-blue-700 flex items-center transition-colors ${
                      Path === link.href ? "text-blue-700" : "text-blue3"
                    } duration-200`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ===================================================
               BOUTONS À DROITE (contact + login)
             =================================================== */}
          <div className="absolute flex gap-3 items-center right-5">
            <Link
              title="Nous contacter"
              href="/contact"
              className="border-[1.5px] border-blue3 text-blue3 hover:text-blue-700 hover:border-blue-700 transition-all p-1 rounded-lg"
            >
              <Mail className="size-4 md:size-[28px]" strokeWidth={1} />
            </Link>
            <LoginButton session={session} />
          </div>

          {/* ===================================================
               BOUTONS MOBILE (menu burger / fermeture)
             =================================================== */}
          {isMenuOpen ? (
            <X
              onClick={toggleMenu}
              aria-label="Fermer le menu"
              className="xl:hidden text-blue3 cursor-pointer hover:text-blue-700 transition-colors duration-200"
            />
          ) : (
            <Menu
              onClick={toggleMenu}
              aria-label="Ouvrir le menu"
              className="xl:hidden text-blue3 cursor-pointer hover:text-blue-700 transition-colors duration-200"
            />
          )}
        </div>

        {/* ===================================================
             MENU MOBILE (coulissant avec accordéons)
           =================================================== */}

        <ul
          className={`xl:hidden text-center overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[1000px] pb-4" : "max-h-0"
          }`}
        >
          {links.map((link) => {
            if (link.requiresAuth && !session?.user) return null;
            if (
              link.requiresRole === "animateur" &&
              session?.user?.role !== "animateur"
            )
              return null;

            // Lien avec sous-menu (accordéon mobile)
            if (link.submenu) {
              const isOpen = openSubmenu === link.label;
              return (
                <li key={link.label} className="py-2">
                  <button
                    onClick={() => toggleSubmenu(link.label)}
                    aria-expanded={isOpen}
                    aria-controls={`submenu-${link.label}`}
                    className="flex justify-center items-center w-full text-blue3 hover:text-blue-700 transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      className={`ml-2 size-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        id={`submenu-${link.label}`}
                        role="menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-1 ml-10"
                      >
                        {link.submenu.map((sublink) => {
                          if (sublink.requiresAuth && !session?.user)
                            return null;
                          if (
                            sublink.requiresRole === "animateur" &&
                            session?.user?.role !== "animateur"
                          )
                            return null;

                          return (
                            <motion.li
                              key={sublink.label}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="py-1"
                            >
                              <Link
                                href={sublink.href}
                                onClick={closeMenu}
                                className={`block text-blue3 text-base hover:text-blue-700 transition-colors ${
                                  Path === sublink.href ? "text-blue-700" : ""
                                }`}
                              >
                                {sublink.label}
                              </Link>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            // Lien simple mobile
            return (
              <li key={link.label} className="py-2">
                <Link
                  prefetch={true}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block text-blue3 hover:text-blue-700 transition-colors ${
                    Path === link.href ? "text-blue-700" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
