"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Layout } from "@/components/Layout";
import { WarningBox } from "@/components/WarningBox";
import { ONBOARDING_REQUESTS } from "@/lib/constants";
import { useProgress } from "@/lib/useProgress";

const modes = [
  {
    id: "daily",
    title: "15 дней подряд",
    text: "Для тех, кому нужен ритм."
  },
  {
    id: "free",
    title: "Свободный режим",
    text: "Можно проходить практики в удобном порядке."
  },
  {
    id: "slow",
    title: "Медленный режим",
    text: "Одна практика в несколько дней."
  }
] as const;

export default function StartPage() {
  const router = useRouter();
  const { progress, update } = useProgress();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(progress.selectedRequests);
  const [mode, setMode] = useState<"daily" | "free" | "slow">(
    progress.mode ?? "daily"
  );

  const next = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      return;
    }

    update((current) => ({
      ...current,
      selectedRequests: selected,
      mode,
      startedAt: current.startedAt ?? new Date().toISOString()
    }));
    router.push("/path");
  };

  return (
    <Layout className="flex min-h-[80vh] items-center">
      <section className="mx-auto w-full max-w-4xl rounded-[40px] border border-navy/15 bg-card/75 p-6 shadow-card md:p-10">
        <p className="mb-8 text-xs uppercase tracking-[0.32em] text-accent">
          Онбординг / {step + 1} из 3
        </p>

        {step === 0 ? (
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              С чем вы пришли?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-navy/70">
              Можно выбрать несколько ответов. Это нужно только для вас.
              Приложение не будет оценивать вас.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {ONBOARDING_REQUESTS.map((item) => {
                const isActive = selected.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setSelected((prev) =>
                        isActive
                          ? prev.filter((entry) => entry !== item)
                          : [...prev, item]
                      )
                    }
                    className={`rounded-[26px] border p-5 text-left text-sm leading-7 transition ${
                      isActive
                        ? "border-accent bg-accent text-navy"
                        : "border-navy/15 bg-white/35"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Как идём?
            </h1>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`rounded-[28px] border p-6 text-left transition ${
                    mode === item.id
                      ? "border-accent bg-accent text-navy"
                      : "border-navy/15 bg-white/35"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                    {item.id}
                  </p>
                  <h2 className="mt-4 text-2xl font-black uppercase leading-none">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 opacity-75">{item.text}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Важно
            </h1>
            <div className="mt-8">
              <WarningBox>
                Это не финансовая, юридическая или психологическая консультация.
                Приложение не даёт инвестиционных советов и не обещает
                конкретный доход. Это пространство для личного исследования,
                дневниковых практик и мягких внутренних наблюдений.
              </WarningBox>
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
            >
              Назад
            </button>
          ) : null}
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
          >
            {step === 2 ? "Начать" : "Дальше"}
          </button>
        </div>
      </section>
    </Layout>
  );
}
