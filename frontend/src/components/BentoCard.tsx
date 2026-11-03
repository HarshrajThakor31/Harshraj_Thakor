import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

export const BentoCard = ({ className, children, delay = 0 }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.32,
        delay: Math.min(delay * 0.35, 0.18),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-[24px]",
        "bg-[#0a0a0a] border border-white/[0.08]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_8px_40px_rgba(0,0,0,0.4)]",
        "hover:border-white/[0.15] transition-colors duration-300 will-change-transform",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {children}
    </motion.div>
  );
};
