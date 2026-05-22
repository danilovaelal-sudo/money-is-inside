"use client";

export function FloatingSymbols({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-navy/50">
      {words.map((word) => (
        <span
          key={word}
          className="rounded-full border border-navy/15 px-3 py-1"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
