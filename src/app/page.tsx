import Link from "next/link";

import { BookCta } from "@/components/BookCta";
import { InfographicPath } from "@/components/InfographicPath";
import { Layout } from "@/components/Layout";
import { MarqueeLine } from "@/components/MarqueeLine";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypingTitle } from "@/components/TypingTitle";
import { practiceDays } from "@/data/practiceDays";
import { formatDayNumber } from "@/lib/utils";

const heroMarquee = "страх + стыд + тело + поток + цель + проявление + игра";

export default function HomePage() {
  return (
    <Layout className="space-y-24 pt-8 md:pt-12">
      <section className="grid min-h-[78vh] items-end gap-12 pb-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-navy/55">
            Интерактивный маршрут по книге и рабочей тетради
          </p>
          <TypingTitle
            text={"ДЕНЬГИ\nВНУТРИ"}
            className="text-[4.4rem] font-black uppercase leading-[0.82] tracking-[-0.06em] text-navy md:text-[9rem]"
          />
          <p className="mt-8 max-w-xl text-lg leading-8 text-navy/75">
            15-дневный интерактивный путь по книге и рабочей тетради.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/start"
              className="rounded-full bg-accent px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-navy"
            >
              Начать путь
            </Link>
            <Link
              href="/book"
              className="rounded-full border border-navy/20 px-7 py-4 text-sm font-black uppercase tracking-[0.22em]"
            >
              Купить книгу на Литрес
            </Link>
          </div>
          <p className="mt-6 text-sm italic text-navy/60">
            не про быстрые деньги, а про честную внутреннюю работу
          </p>
        </div>
        <div className="self-center rounded-[36px] border border-navy/15 bg-card/70 p-6 shadow-card md:p-10">
          <div className="mb-6 text-xs uppercase tracking-[0.32em] text-accent">
            Вводная карта
          </div>
          <div className="grid gap-4 text-sm leading-7 text-navy/75">
            <p>
              Не финансовый советник. Не марафон обещаний. Не эзотерическая
              игра.
            </p>
            <p>
              Это пространство, где можно заметить, прислушаться, отделить
              чужой голос и пройти путь без давления.
            </p>
            <p>
              В конце собирается личная интерактивная карта, в которой видны
              страхи, опоры, желания и новые правила.
            </p>
          </div>
        </div>
      </section>

      <MarqueeLine text={heroMarquee} />

      <ScrollReveal className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="whitespace-pre-line text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-7xl">
            {"ЭТО НЕ ПРО\nБЫСТРЫЕ ДЕНЬГИ"}
          </h2>
        </div>
        <div className="space-y-6">
          <p className="max-w-2xl text-lg leading-8 text-navy/75">
            Это путь, где человек день за днём смотрит на свои денежные страхи,
            установки, стыд, тело, желание, творчество и право занимать место.
          </p>
          <InfographicPath />
        </div>
      </ScrollReveal>

      <ScrollReveal className="space-y-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Как это работает
          </p>
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
            ЧИТАЕТЕ. ПИШЕТЕ. ДВИГАЕТЕСЬ. СОБИРАЕТЕ.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-12">
          {[
            ["01", "Читаете смысл дня", "Короткий фрагмент идеи, без длинных лекций."],
            ["02", "Отвечаете на вопросы", "Не тест, не экзамен, а дневниковое исследование."],
            ["03", "Делаете маленькое действие", "Один шаг, который можно сделать без героизма."],
            ["04", "Собираете карту", "В конце появляется личная «Карта денег внутри»."]
          ].map(([number, title, text], index) => (
            <article
              key={number}
              className={`rounded-[32px] border border-navy/15 bg-card/75 p-6 shadow-soft ${
                index === 0
                  ? "md:col-span-5"
                  : index === 1
                    ? "md:col-span-7"
                    : index === 2
                      ? "md:col-span-7"
                      : "md:col-span-5"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-3xl font-black text-accent">{number}</span>
                <span className="text-navy/40">+</span>
              </div>
              <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-navy/70">{text}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="space-y-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-accent">
              Маршрут
            </p>
            <h2 className="whitespace-pre-line text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-7xl">
              {"15 СЛОЁВ\nВНУТРЕННЕЙ РАБОТЫ"}
            </h2>
          </div>
          <Link
            href="/path"
            className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
          >
            Смотреть весь путь
          </Link>
        </div>
        <div className="grid gap-4">
          {practiceDays.map((day) => (
            <Link
              key={day.id}
              href={`/day/${day.id}`}
              className="grid gap-4 rounded-[28px] border border-navy/15 bg-card/75 p-5 shadow-soft transition hover:-translate-y-1 hover:border-accent md:grid-cols-[90px_220px_1fr]"
            >
              <span className="text-3xl font-black text-accent">
                {formatDayNumber(day.id)}
              </span>
              <span className="text-xl font-black uppercase">{day.shortTitle}</span>
              <span className="text-sm leading-7 text-navy/70">{day.subtitle}</span>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="rounded-[40px] border border-navy/15 bg-ink px-6 py-12 text-milk shadow-card md:px-10">
        <h2 className="whitespace-pre-line text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-7xl">
          {"ГОТОВЫ ВКЛЮЧИТЬ СВЕТ?"}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-milk/80">
          Начните с первого слоя. Не надо сразу менять жизнь. Достаточно увидеть
          одну фразу, которая давно говорит внутри чужим голосом.
        </p>
        <Link
          href="/day/1"
          className="mt-8 inline-flex rounded-full bg-accent px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-navy"
        >
          Начать первую практику
        </Link>
      </ScrollReveal>

      <BookCta />
    </Layout>
  );
}
