"use client";

import { useState, useRef } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";

export default function LoginButton({ session }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Ferme le dropdown si on clique à l’extérieur
  useHandleClickOutside(menuRef, () => setIsOpen(false));

  const logOut = async () => {
    await signOut({ redirect: false });
    setIsOpen((prev) => !prev);
    router.refresh();
  };

  // 🔹 Cas 1 : utilisateur non connecté → bouton connexion (icône seule)
  if (!session?.user) {
    return (
      <div className="absolute md:top-1/2 transform md:-translate-y-1/2 right-5 group">
        <button
          onClick={() => router.push("/login")}
          className="p-1 md:p-2 rounded-lg text-blue3 border-[1.5px] border-blue3 hover:text-blue-700 hover:border-blue-700 text-xs md:text-sm transition cursor-pointer"
        >
          Connexion
        </button>
      </div>
    );
  }

  // 🔹 Cas 2 : utilisateur connecté → bouton dropdown avec infos
  return (
    <div className="absolute right-5">
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center text-blue3 border-[1.5px] border-blue3 hover:text-blue-700 hover:border-blue-700 p-1 md:p-2 rounded-lg transition-all duration-200 cursor-pointer"
          aria-label="Menu utilisateur"
        >
          <User size={22} />
          <ChevronDown size={16} className="ml-1" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-sand border border-blue2 rounded-xl shadow-xl py-2 z-50"
            >
              <div className="px-4 py-3 border-b border-blue2/20">
                <p className="text-sm text-blue3">{session.user.email}</p>
              </div>
              <button
                onClick={logOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
