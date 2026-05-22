"use client";

import type { ChangeEvent } from "react";

import type { PracticeQuestion } from "@/types";

export function QuestionField({
  question,
  value,
  onChange
}: {
  question: PracticeQuestion;
  value: string | number | string[] | undefined;
  onChange: (value: string | number | string[]) => void;
}) {
  const baseClass =
    "w-full rounded-[24px] border border-navy/15 bg-white/50 px-5 py-4 text-base text-navy outline-none transition focus:border-accent focus:bg-white";

  if (question.type === "choice" && question.options) {
    return (
      <div className="grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-[22px] border px-4 py-3 text-left text-sm transition ${
              value === option
                ? "border-accent bg-accent text-navy"
                : "border-navy/15 bg-card/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "multiChoice" && question.options) {
    const current = Array.isArray(value) ? value : [];
    return (
      <div className="grid gap-3">
        {question.options.map((option) => {
          const isActive = current.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                onChange(
                  isActive
                    ? current.filter((item) => item !== option)
                    : [...current, option]
                )
              }
              className={`rounded-[22px] border px-4 py-3 text-left text-sm transition ${
                isActive
                  ? "border-accent bg-accent text-navy"
                  : "border-navy/15 bg-card/50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === "scale") {
    const current = typeof value === "number" ? value : 5;
    return (
      <div className="space-y-3">
        <input
          type="range"
          min={1}
          max={10}
          value={current}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(Number(event.target.value))
          }
          className="w-full accent-[#F4A51C]"
        />
        <div className="text-sm text-navy/60">Уровень: {current} / 10</div>
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <input
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        className={baseClass}
      />
    );
  }

  return (
    <textarea
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      rows={5}
      className={`${baseClass} min-h-36 resize-y`}
    />
  );
}
