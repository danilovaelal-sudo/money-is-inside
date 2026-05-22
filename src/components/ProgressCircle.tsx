"use client";

import { motion } from "framer-motion";

export function ProgressCircle({
  value,
  total,
  label
}: {
  value: number;
  total: number;
  label?: string;
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const percent = total === 0 ? 0 : value / total;
  const offset = circumference - circumference * percent;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(23, 28, 63, 0.12)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#F4A51C"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-navy">
          <span className="text-3xl font-black">{value}</span>
          <span className="text-xs uppercase tracking-[0.3em]">из {total}</span>
        </div>
      </div>
      {label ? (
        <p className="max-w-[180px] text-sm leading-relaxed text-navy/70">
          {label}
        </p>
      ) : null}
    </div>
  );
}
