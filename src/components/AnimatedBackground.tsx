"use client";

import { motion } from "framer-motion";

const symbols = ["+", "01", "///", "○", "●", "→", "₽", "?"];

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-paper bg-grain opacity-95" />
      {symbols.map((symbol, index) => (
        <motion.div
          key={`${symbol}-${index}`}
          className="absolute text-navy/10"
          initial={{ opacity: 0.12 }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.08, 0.16, 0.08]
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${8 + ((index * 11) % 80)}%`,
            top: `${6 + ((index * 13) % 82)}%`,
            fontSize: `${24 + (index % 3) * 18}px`
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}
