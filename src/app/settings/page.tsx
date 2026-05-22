"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Layout } from "@/components/Layout";
import { ResetProgressModal } from "@/components/ResetProgressModal";
import { useProgress } from "@/lib/useProgress";

export default function SettingsPage() {
  const router = useRouter();
  const { progress, reset } = useProgress();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout className="space-y-10 pt-6 md:pt-10">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          Настройки
        </p>
        <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
          НАСТРОЙКИ
        </h1>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-[30px] border border-navy/15 bg-card/80 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Текущий прогресс
          </p>
          <p className="mt-4 text-lg leading-8 text-navy/74">
            Завершено дней: {progress.completedDays.length}
          </p>
          <p className="text-lg leading-8 text-navy/74">
            Текущий день: {progress.currentDay}
          </p>
        </article>
        <article className="rounded-[30px] border border-navy/15 bg-card/80 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Режим и дата начала
          </p>
          <p className="mt-4 text-lg leading-8 text-navy/74">
            Режим: {progress.mode ?? "не выбран"}
          </p>
          <p className="text-lg leading-8 text-navy/74">
            Дата начала:{" "}
            {progress.startedAt
              ? new Date(progress.startedAt).toLocaleDateString("ru-RU")
              : "ещё не начато"}
          </p>
        </article>
      </section>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex rounded-full bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-milk"
      >
        Сбросить прогресс
      </button>

      <ResetProgressModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          reset();
          setIsOpen(false);
          router.push("/start");
        }}
      />
    </Layout>
  );
}
