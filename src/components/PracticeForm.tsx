"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ProgressBar } from "@/components/ProgressBar";
import { QuestionField } from "@/components/QuestionField";
import type { PracticeQuestion } from "@/types";

export function PracticeForm({
  questions,
  values,
  onChange,
  currentIndex,
  showAll,
  onNext,
  onToggleShowAll
}: {
  questions: PracticeQuestion[];
  values: Record<string, string | number | string[]>;
  onChange: (id: string, value: string | number | string[]) => void;
  currentIndex: number;
  showAll: boolean;
  onNext: () => void;
  onToggleShowAll: () => void;
}) {
  const currentQuestion = questions[currentIndex];
  const displayedQuestions = showAll ? questions : [currentQuestion];

  return (
    <div className="rounded-[32px] border border-navy/15 bg-card/70 p-6 shadow-soft md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-navy/55">
            Практика
          </p>
          <p className="mt-2 text-sm text-navy/65">
            Вопрос {Math.min(currentIndex + 1, questions.length)} из{" "}
            {questions.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleShowAll}
          className="rounded-full border border-navy/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]"
        >
          {showAll ? "Пошаговый режим" : "Показать все вопросы"}
        </button>
      </div>
      <ProgressBar value={currentIndex + 1} total={questions.length} />
      <div className="mt-8 space-y-6">
        <AnimatePresence>
          {displayedQuestions.map((question, index) => (
            <motion.div
              key={showAll ? question.id : `${question.id}-${currentIndex}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] bg-white/35 p-5"
            >
              <p className="mb-3 text-sm font-semibold text-navy">
                {showAll ? index + 1 : currentIndex + 1}. {question.label}
              </p>
              {question.helperText ? (
                <p className="mb-3 text-sm text-navy/55">{question.helperText}</p>
              ) : null}
              <QuestionField
                question={question}
                value={values[question.id]}
                onChange={(value) => onChange(question.id, value)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {!showAll && currentIndex < questions.length - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="mt-6 rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-navy"
        >
          Дальше
        </button>
      ) : null}
    </div>
  );
}
