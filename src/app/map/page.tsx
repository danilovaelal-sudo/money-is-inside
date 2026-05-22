"use client";

import Link from "next/link";

import { Layout } from "@/components/Layout";
import { MapSection } from "@/components/MapSection";
import { ProgressCircle } from "@/components/ProgressCircle";
import { practiceDays } from "@/data/practiceDays";
import { MAP_TITLES } from "@/lib/constants";
import { useProgress } from "@/lib/useProgress";

function extractMapValue(dayId: number, progressAnswers: ReturnType<typeof useProgress>["progress"]["answers"]) {
  const entry = progressAnswers[dayId];
  if (!entry) {
    return undefined;
  }

  return (
    entry.finalInsight ||
    (typeof entry.answers.q5 === "string" ? entry.answers.q5 : undefined) ||
    Object.values(entry.answers)
      .map((value) => (Array.isArray(value) ? value.join(", ") : String(value)))
      .find(Boolean)
  );
}

export default function MapPage() {
  const { progress } = useProgress();

  return (
    <Layout className="space-y-10 pt-6 md:pt-10">
      <section className="grid gap-8 md:grid-cols-[1fr_280px]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Карта
          </p>
          <h1 className="whitespace-pre-line text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
            {"МОЯ КАРТА\nДЕНЕГ ВНУТРИ"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/72">
            Здесь собираются ваши ключевые ответы из 15 практик.
          </p>
        </div>
        <ProgressCircle
          value={progress.completedDays.length}
          total={15}
          label="Каждый раздел собирается из записей практик и постепенно превращается в личную карту."
        />
      </section>

      <div className="grid gap-5">
        {practiceDays.map((day, index) => (
          <MapSection
            key={day.id}
            index={day.id}
            title={MAP_TITLES[index]}
            content={extractMapValue(day.id, progress.answers)}
          />
        ))}
      </div>

      <Link
        href="/path"
        className="inline-flex rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
      >
        Вернуться к маршруту
      </Link>
    </Layout>
  );
}
