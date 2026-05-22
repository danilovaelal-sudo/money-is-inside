"use client";

import { DayCard } from "@/components/DayCard";
import { Layout } from "@/components/Layout";
import { ProgressCircle } from "@/components/ProgressCircle";
import { practiceDays } from "@/data/practiceDays";
import { PATH_SECTIONS } from "@/lib/constants";
import { useProgress } from "@/lib/useProgress";
import { getDayStatus } from "@/lib/utils";

export default function PathPage() {
  const { progress } = useProgress();

  return (
    <Layout className="space-y-12 pt-6 md:pt-10">
      <section className="grid gap-10 md:grid-cols-[1fr_300px]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-accent">
            Маршрут
          </p>
          <h1 className="whitespace-pre-line text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
            {"15 ДНЕЙ\nВНУТРЬ"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/72">
            Каждая практика открывает один слой: страх, тело, стыд,
            проявление, желание, творчество, смысл.
          </p>
        </div>
        <div className="space-y-8 rounded-[34px] border border-navy/15 bg-card/75 p-6 shadow-soft">
          <ProgressCircle
            value={progress.completedDays.length}
            total={15}
            label={`${progress.completedDays.length} / 15 практик пройдено`}
          />
          <div className="space-y-3">
            {PATH_SECTIONS.map((section, index) => (
              <div key={section} className="flex items-center gap-3">
                <span className="w-8 text-xs uppercase tracking-[0.24em] text-navy/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-navy/12" />
                <span className="text-sm text-navy/65">{section}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {practiceDays.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            status={getDayStatus(day.id, progress.completedDays, progress.answers)}
          />
        ))}
      </section>
    </Layout>
  );
}
