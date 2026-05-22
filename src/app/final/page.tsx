"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Layout } from "@/components/Layout";
import { useProgress } from "@/lib/useProgress";
import { getMostCommonEmotion } from "@/lib/utils";

export default function FinalPage() {
  const router = useRouter();
  const { progress, reset } = useProgress();
  const emotions = getMostCommonEmotion(progress.answers);

  return (
    <Layout className="space-y-10 pt-6 md:pt-10">
      <section className="rounded-[40px] border border-navy/15 bg-ink p-8 text-milk shadow-card md:p-12">
        <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
          ВЫ ПРОШЛИ ПУТЬ
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-milk/80">
          Это не финал. Это первая собранная карта. Теперь вы видите не просто
          проблемы с деньгами, а живую внутреннюю систему: страхи, желания,
          запреты, опоры, силу и новые правила.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[30px] border border-navy/15 bg-card/75 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.32em] text-accent">
            Пройдено
          </p>
          <p className="mt-4 text-5xl font-black">{progress.completedDays.length}</p>
          <p className="mt-2 text-sm text-navy/65">из 15 дней</p>
        </article>
        <article className="rounded-[30px] border border-navy/15 bg-card/75 p-6 shadow-soft md:col-span-2">
          <p className="text-xs uppercase tracking-[0.32em] text-accent">
            Частые состояния
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {emotions.length > 0 ? (
              emotions.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-navy/15 px-4 py-3 text-sm"
                >
                  {item.label} · {item.count}
                </span>
              ))
            ) : (
              <span className="text-sm text-navy/65">
                Пока недостаточно данных для итогового рисунка состояний.
              </span>
            )}
          </div>
        </article>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link
          href="/map"
          className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
        >
          Смотреть мою карту
        </Link>
        <Link
          href="/path"
          className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
        >
          Вернуться к маршруту
        </Link>
        <Link
          href="/book"
          className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
        >
          Купить книгу на Литрес
        </Link>
        <button
          type="button"
          onClick={() => {
            reset();
            router.push("/start");
          }}
          className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
        >
          Начать заново
        </button>
      </section>
    </Layout>
  );
}
