"use client";

export function MarqueeLine({ text }: { text: string }) {
  return (
    <div className="overflow-hidden border-y border-navy/15 py-3 text-xs uppercase tracking-[0.35em] text-navy/65">
      <div className="flex min-w-max animate-marquee gap-8">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
