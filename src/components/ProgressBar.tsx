"use client";

import { motion } from "framer-motion";

export function ProgressBar({
  value,
  total
}: {
  value: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : Math.min(100, (value / total) * 100);

  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-navy/10">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
