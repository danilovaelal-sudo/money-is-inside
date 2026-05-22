"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { MarqueeLine } from "@/components/MarqueeLine";

const items = [
  { href: "/", label: "Главная" },
  { href: "/start", label: "Начать путь" },
  { href: "/path", label: "Маршрут" },
  { href: "/journal", label: "Дневник" },
  { href: "/map", label: "Карта" },
  { href: "/book", label: "Книга" },
  { href: "/settings", label: "Настройки" }
];

export function FullScreenMenu({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink text-milk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex h-full flex-col justify-between p-6 md:p-10">
            <div className="flex items-start justify-between">
              <p className="text-xs uppercase tracking-[0.32em] text-accent">
                Деньги внутри
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-14 w-14 items-center justify-center border border-milk/25 text-xl"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="inline-flex text-3xl font-black uppercase tracking-tight text-milk transition hover:text-accent md:text-6xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <MarqueeLine text="деньги + страх + тело + стыд + цель + игра" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
