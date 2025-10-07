"use client";

import { useState, useRef } from "react";
import { LogOut, CircleChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";

export default function LoginButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useHandleClickOutside(menuRef, () => setIsOpen(false));

  const logOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  if (!session?.user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="flex items-center gap-2 bg-sand hover:bg-white border border-blue2 text-blue3 px-2 md:px-4 py-1 md:py-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 text-xs md:text-sm font-medium hover:shadow-xl"
      >
        Connexion
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Bouton utilisateur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex border border-blue2 items-center gap-2 bg-sand hover:bg-white px-2 md:px-3 py-1 md:py-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
      >
        <div className="w-7 md:w-8 h-7 md-h-8 bg-blue3 rounded-full border border-blue2 flex items-center justify-center text-white font-semibold text-xs md:text-sm">
          {session.user.firstname?.[0].toUpperCase()}
          {session.user.name?.[0].toUpperCase()}
        </div>
        <span className="hidden md:inline text-blue3 text-sm">
          <CircleChevronDown strokeWidth={1.5} />
        </span>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 bg-sand border border-blue2 rounded-lg shadow-xl py-2 z-5000 "
          >
            {/* Info utilisateur */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-blue3">
                {session.user.email}
              </p>
            </div>

            {/* Déconnexion */}
            <button
              onClick={logOut}
              className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Se déconnecter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
