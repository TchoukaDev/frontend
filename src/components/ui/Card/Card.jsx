"use client";

import { motion } from "framer-motion";

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="custom-gradient-light w-[95%] md:w-[80%] lg:w-[70%] py-5 md:py-15 px-1 md:px-16 min-h-[80vh] mx-auto my-10 rounded-2xl border-2 border-blue3 shadow-lg shadow-blue3/30"
    >
      {children}
    </motion.div>
  );
}
