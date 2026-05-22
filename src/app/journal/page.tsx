"use client";

import { useMemo, useState } from "react";

import { JournalCard } from "@/components/JournalCard";
import { Layout } from "@/components/Layout";
import { ProgressCircle } from "@/components/ProgressCircle";
import { practiceDays } from "@/data/practiceDays";
import { useProgress } from "@/lib/useProgress";

const filters = [
  "все записи",
  "установки",
  "страхи",
  "желания",
  "тело",
  "стыд",
  "творчество",
  "итоговые фразы"
] as const;

export default function JournalPage() {
  const { progress } = useProgress();
  const [filter, setFilter] = useState<(typeof filters)[number]>("все записи");

  const entries = useMemo(() => {
    return practiceDays
      .filter((day) => progress.answers[day.id])
      .filter((day) => filter === "все записи" || day.category === filter)
      .map((day) => {
        const answer = progress.answers[day.id];
        const answerText = Object.entries(answer.answers)
          .map(([key, value], index) => {
            const label =
              day.questions.find((question) => question.id === key)?.label ||
              `Ответ ${index + 1}`;
            const formatted = Array.isArray(value) ? value.join(", ") : String(value);
            return `${label}: ${formatted}`;
          })
          .join("\n\n");

        return {
          dayId: day.id,
          title: day.title,
          question: day.mainQuestion,
          answer: answerText || "Запись ещё почти пустая.",
          emotionalState: answer.emotionalState,
          finalInsight: answer.finalInsight
        };
      });
  }, [filter, progress.answers]);

  return (
    <Layout className="space-y-10 pt-6 md:pt-10">
      <section className="grid gap-8 md:grid-cols-[1fr_280px]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Дневник
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
            МОЙ ДНЕВНИК
          </h1>
        </div>
        <ProgressCircle
          value={progress.completedDays.length}
          total={15}
          label="Здесь собираются ответы, состояния и итоговые фразы по дням."
        />
      </section>

      <section className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] ${
              filter === item
                ? "bg-accent text-navy"
                : "border border-navy/15 bg-card/50"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="grid gap-5">
        {entries.length > 0 ? (
          entries.map((entry) => <JournalCard key={entry.dayId} {...entry} />)
        ) : (
          <div className="rounded-[30px] border border-dashed border-navy/20 bg-card/60 p-8 text-sm leading-7 text-navy/65">
            Здесь пока пусто. Когда появятся ответы, дневник соберёт их по
            практикам.
          </div>
        )}
      </section>
    </Layout>
  );
}
