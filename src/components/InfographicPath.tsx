"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    key: "страх",
    hint: "что я слышу внутри",
    backText:
      "Не спорим со страхом сразу. Сначала замечаем, какие старые денежные фразы до сих пор звучат внутри."
  },
  {
    key: "наблюдение",
    hint: "что я замечаю без борьбы",
    backText:
      "Наблюдение помогает увидеть внутренний механизм без давления и отличить свой голос от чужого."
  },
  {
    key: "действие",
    hint: "какой маленький шаг выбираю",
    backText:
      "Один небольшой шаг двигает дальше большого обещания. Маршрут строится без героизма, но честно."
  },
  {
    key: "запись",
    hint: "что фиксирую в дневнике",
    backText:
      "Когда мысль записана, она перестаёт быть фоном. Дневник собирает разрозненные открытия в ясные слова."
  },
  {
    key: "карта",
    hint: "что собирается в конце",
    backText:
      "Из ответов, состояний и маленьких действий постепенно складывается личная карта денег внутри."
  }
];

export function InfographicPath() {
  const [flippedKey, setFlippedKey] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:gap-5">
      {items.map((item, index) => (
        <motion.button
          key={item.key}
          whileHover={{ y: -4, scale: 1.01 }}
          type="button"
          onClick={() =>
            setFlippedKey((current) => (current === item.key ? null : item.key))
          }
          className="group relative min-h-[290px] rounded-[28px] text-left [perspective:1200px] xl:min-h-[360px] xl:w-[186px] xl:flex-none"
        >
          <div
            className={`relative min-h-[290px] rounded-[28px] transition duration-500 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] xl:min-h-[360px] ${
              flippedKey === item.key ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-[28px] border border-navy/15 bg-card/80 px-6 py-7 shadow-soft [backface-visibility:hidden] xl:px-7 xl:py-8">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-navy/50">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>→</span>
              </div>
              <h3 className="mb-4 text-[1.3rem] font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-[1.42rem] xl:text-[1.82rem]">
                {item.key}
              </h3>
              <p className="max-w-[15ch] text-[15px] leading-8 text-navy/70 sm:max-w-[16ch] xl:max-w-[14ch] xl:text-[1.1rem] xl:leading-9">
                {item.hint}
              </p>
            </div>

            <div className="absolute inset-0 rounded-[28px] border border-navy/15 bg-ink px-6 py-7 text-milk shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)] xl:px-7 xl:py-8">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-accent/80">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>слой</span>
              </div>
              <h3 className="mb-4 text-[1.1rem] font-black uppercase leading-[1] tracking-[-0.03em] text-accent sm:text-[1.2rem] xl:text-[1.38rem]">
                {item.key}
              </h3>
              <p className="text-sm leading-7 text-milk/82 xl:text-[15px] xl:leading-7">
                {item.backText}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
