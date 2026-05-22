"use client";

import { motion } from "framer-motion";

const items = [
  { key: "страх", hint: "что я слышу внутри" },
  { key: "наблюдение", hint: "что я замечаю без борьбы" },
  { key: "действие", hint: "какой маленький шаг выбираю" },
  { key: "запись", hint: "что фиксирую в дневнике" },
  { key: "карта", hint: "что собирается в конце" }
];

export function InfographicPath() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map((item, index) => (
        <motion.div
          key={item.key}
          whileHover={{ y: -4, scale: 1.01 }}
          className="group rounded-[28px] border border-navy/15 bg-card/80 p-5 shadow-soft transition"
        >
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-navy/50">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>→</span>
          </div>
          <h3 className="mb-2 text-lg font-black uppercase">{item.key}</h3>
          <p className="text-sm leading-6 text-navy/70">{item.hint}</p>
        </motion.div>
      ))}
    </div>
  );
}
