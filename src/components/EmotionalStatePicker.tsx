"use client";

import { motion } from "framer-motion";

import { EMOTIONAL_STATES } from "@/lib/constants";

export function EmotionalStatePicker({
  value,
  onChange
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {EMOTIONAL_STATES.map((state) => (
        <motion.button
          key={state}
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onChange(state)}
          className={`rounded-full border px-4 py-3 text-sm transition ${
            value === state
              ? "border-accent bg-accent text-navy"
              : "border-navy/15 bg-card/50 text-navy"
          }`}
        >
          {state}
        </motion.button>
      ))}
    </div>
  );
}
