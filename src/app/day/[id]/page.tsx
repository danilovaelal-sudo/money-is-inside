"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { EmotionalStatePicker } from "@/components/EmotionalStatePicker";
import { FloatingSymbols } from "@/components/FloatingSymbols";
import { Layout } from "@/components/Layout";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionField } from "@/components/QuestionField";
import { StepQuestionFlow } from "@/components/StepQuestionFlow";
import { TypingTitle } from "@/components/TypingTitle";
import { useProgress } from "@/lib/useProgress";
import { formatDayNumber, getDayById } from "@/lib/utils";

export default function DayPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dayId = Number(params.id);
  const day = getDayById(dayId);
  const { progress, updateDay, complete } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);
  const [completedPulse, setCompletedPulse] = useState(false);

  if (!day) {
    return (
      <Layout className="pt-10">
        <div className="rounded-[32px] border border-navy/15 bg-card/80 p-8 shadow-soft">
          <h1 className="text-4xl font-black uppercase">День не найден</h1>
          <p className="mt-4 text-sm leading-7 text-navy/70">
            Вернитесь к маршруту и выберите один из 15 доступных дней.
          </p>
          <Link
            href="/path"
            className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
          >
            К маршруту
          </Link>
        </div>
      </Layout>
    );
  }

  const savedAnswer = progress.answers[day.id];
  const answers = savedAnswer?.answers ?? {};
  const creativeAnswers = savedAnswer?.creativeAnswers ?? {};

  const dayProgress = useMemo(() => {
    const filled = day.questions.filter((question) => {
      const value = answers[question.id];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== "";
    }).length;

    return filled;
  }, [answers, day.questions]);

  const triggerSaved = () => {
    setSavedPulse(true);
    window.setTimeout(() => setSavedPulse(false), 900);
  };

  const handleSave = () => {
    updateDay(day.id, {
      dayId: day.id,
      answers,
      creativeAnswers,
      emotionalState: savedAnswer?.emotionalState,
      finalInsight: savedAnswer?.finalInsight,
      smallActionDone: savedAnswer?.smallActionDone
    });
    triggerSaved();
  };

  const handleComplete = () => {
    complete(day.id);
    setCompletedPulse(true);
    window.setTimeout(() => setCompletedPulse(false), 1800);
  };

  return (
    <Layout className="space-y-8 pt-6 md:pt-10">
      <section className="space-y-5">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          День {formatDayNumber(day.id)} / 15
        </p>
        <TypingTitle
          text={`${day.title.toUpperCase()}`}
          className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl"
        />
        <ProgressBar value={dayProgress} total={day.questions.length} />
        <FloatingSymbols words={day.decorativeWords} />
      </section>

      <section className="rounded-[34px] border border-navy/15 bg-card/80 p-6 shadow-soft md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-4xl font-black text-accent">
            {formatDayNumber(day.id)}
          </span>
          <span className="text-xl text-navy/35">+</span>
        </div>
        <p className="max-w-3xl text-lg leading-8 text-navy/78">{day.intro}</p>
        <p className="mt-6 border-t border-navy/12 pt-6 text-sm uppercase tracking-[0.24em] text-navy/50">
          Сегодня мы не спорим. Мы смотрим честно и собираем свой слой.
        </p>
      </section>

      <section className="rounded-[34px] border border-navy/15 bg-ink px-6 py-8 text-milk shadow-card md:px-8">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          Главный вопрос дня
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
          {day.mainQuestion}
        </h2>
      </section>

      <StepQuestionFlow
        questions={day.questions}
        values={answers}
        currentIndex={currentIndex}
        showAll={showAll}
        onChange={(id, value) =>
          updateDay(day.id, {
            answers: {
              ...answers,
              [id]: value
            }
          })
        }
        onNext={() =>
          setCurrentIndex((prev) => Math.min(day.questions.length - 1, prev + 1))
        }
        onToggleShowAll={() => setShowAll((prev) => !prev)}
      />

      <section className="rounded-[34px] border border-accent/60 bg-accent/15 p-6 shadow-soft md:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          Маленькое действие
        </p>
        <h3 className="mt-4 text-3xl font-black uppercase">{day.smallAction.title}</h3>
        <p className="mt-4 max-w-3xl text-base leading-8 text-navy/75">
          {day.smallAction.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-navy/60">
          <span>услышал</span>
          <span>→</span>
          <span>назвал</span>
          <span>→</span>
          <span>не подчинился</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              updateDay(day.id, {
                smallActionDone: true
              })
            }
            className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] ${
              savedAnswer?.smallActionDone
                ? "bg-navy text-milk"
                : "bg-accent text-navy"
            }`}
          >
            {day.smallAction.doneLabel}
          </button>
          <button
            type="button"
            onClick={() =>
              updateDay(day.id, {
                smallActionDone: false
              })
            }
            className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
          >
            {day.smallAction.laterLabel}
          </button>
        </div>
      </section>

      <section className="rounded-[34px] border border-navy/15 bg-card/80 p-6 shadow-soft md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">
              Творческое задание
            </p>
            <h3 className="mt-3 text-3xl font-black uppercase">
              {day.creativeTask.title}
            </h3>
          </div>
          <span className="rounded-full border border-navy/15 px-4 py-2 text-xs italic text-navy/55">
            слой открыт
          </span>
        </div>
        <p className="mb-6 max-w-3xl text-base leading-8 text-navy/74">
          {day.creativeTask.description}
        </p>
        <div className="grid gap-5">
          {day.creativeTask.fields.map((field) => (
            <div key={field.id}>
              <p className="mb-3 text-sm font-semibold text-navy">{field.label}</p>
              <QuestionField
                question={field}
                value={creativeAnswers[field.id]}
                onChange={(value) =>
                  updateDay(day.id, {
                    creativeAnswers: {
                      ...creativeAnswers,
                      [field.id]: value
                    }
                  })
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[34px] border border-navy/15 bg-card/80 p-6 shadow-soft md:p-8">
        <p className="mb-5 text-xs uppercase tracking-[0.32em] text-accent">
          Состояние после практики
        </p>
        <EmotionalStatePicker
          value={savedAnswer?.emotionalState}
          onChange={(value) =>
            updateDay(day.id, {
              emotionalState: value
            })
          }
        />
      </section>

      <section className="rounded-[34px] border border-navy/15 bg-card/80 p-6 shadow-soft md:p-8">
        <p className="mb-5 text-xs uppercase tracking-[0.32em] text-accent">
          Итог дня
        </p>
        <QuestionField
          question={{
            id: "finalInsight",
            label: "Что я забираю с собой?",
            type: "textarea"
          }}
          value={savedAnswer?.finalInsight}
          onChange={(value) =>
            updateDay(day.id, {
              finalInsight: String(value)
            })
          }
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
          >
            Завершить день
          </button>
        </div>
        {savedPulse ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-accent"
          >
            Ответ сохранён.
          </motion.p>
        ) : null}
        {completedPulse ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-[24px] bg-ink p-5 text-milk"
          >
            <p className="text-lg font-black uppercase">День завершён</p>
            <p className="mt-2 text-sm leading-7 text-milk/80">
              Можно перейти к следующему дню или открыть карту, чтобы увидеть,
              как собирается путь.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push(day.id < 15 ? `/day/${day.id + 1}` : "/final")}
                className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
              >
                {day.id < 15 ? "Следующий день" : "К финалу"}
              </button>
              <Link
                href="/map"
                className="rounded-full border border-milk/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
              >
                Открыть карту
              </Link>
            </div>
          </motion.div>
        ) : null}
      </section>
    </Layout>
  );
}
