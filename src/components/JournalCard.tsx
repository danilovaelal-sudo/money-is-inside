import Link from "next/link";

import { formatDayNumber } from "@/lib/utils";

export function JournalCard({
  dayId,
  title,
  question,
  answer,
  emotionalState,
  finalInsight
}: {
  dayId: number;
  title: string;
  question: string;
  answer: string;
  emotionalState?: string;
  finalInsight?: string;
}) {
  return (
    <article className="rounded-[30px] border border-navy/15 bg-card/80 p-6 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-navy/50">
            День {formatDayNumber(dayId)}
          </p>
          <h3 className="mt-2 text-2xl font-black uppercase">{title}</h3>
        </div>
        <div className="h-16 w-px bg-navy/15" />
      </div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
        Вопрос
      </p>
      <p className="mb-4 text-sm leading-6 text-navy/70">{question}</p>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">
        Ответ
      </p>
      <p className="mb-4 text-sm leading-7 text-navy">{answer}</p>
      {emotionalState ? (
        <p className="mb-3 text-sm text-navy/70">
          Состояние: <span className="font-semibold">{emotionalState}</span>
        </p>
      ) : null}
      {finalInsight ? (
        <p className="mb-5 text-sm text-navy/70">
          Итоговая фраза: <span className="font-semibold">{finalInsight}</span>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/day/${dayId}`}
          className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-navy"
        >
          Редактировать
        </Link>
        <Link
          href={`/day/${dayId}`}
          className="rounded-full border border-navy/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"
        >
          Вернуться к практике
        </Link>
      </div>
    </article>
  );
}
