"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ title, links = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full md:w-1/2 gap-2 items-start">
      {/* Bouton toggle - mobile uniquement */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-semibold flex gap-2 text-left items-start cursor-pointer md:cursor-default"
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <ChevronDown size={15} />
        </motion.div>
      </div>

      {/* Mobile: avec animation */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1 overflow-hidden"
            >
              {links?.map((link) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footerLink"
                  >
                    {link.nom}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: toujours visible, sans animation */}
      <ul className="hidden md:flex flex-col gap-1">
        {links?.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink"
            >
              {link.nom}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
