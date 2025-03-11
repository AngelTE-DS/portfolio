"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, y: -100 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        variants={variants}
        transition={{ type: "linear" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
