"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { formatDayNumber } from "@/lib/utils";
import type { PracticeDay } from "@/types";

export function DayCard({
  day,
  status
}: {
  day: PracticeDay;
  status: "idle" | "active" | "completed";
}) {
  const styles = {
    idle: "bg-card/85 border-navy/15",
    active: "bg-card/95 border-accent",
    completed: "bg-ink text-milk border-ink"
  }[status];

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      className={`rounded-[30px] border p-5 shadow-soft transition ${styles}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] opacity-60">
            День {formatDayNumber(day.id)}
          </p>
          <h3 className="mt-2 text-2xl font-black uppercase leading-none">
            {day.shortTitle}
          </h3>
        </div>
        <span className="rounded-full border border-current/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em]">
          {status === "idle"
            ? "не начато"
            : status === "active"
              ? "в процессе"
              : "завершено"}
        </span>
      </div>
      <p className="mb-3 text-sm uppercase tracking-[0.22em] opacity-60">
        {day.subtitle}
      </p>
      <p className="mb-6 text-sm leading-6 opacity-85">{day.mainQuestion}</p>
      <Link
        href={`/day/${day.id}`}
        className={`inline-flex rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] ${
          status === "completed"
            ? "bg-accent text-navy"
            : "border border-current/15 bg-white/20"
        }`}
      >
        Открыть
      </Link>
    </motion.article>
  );
}
