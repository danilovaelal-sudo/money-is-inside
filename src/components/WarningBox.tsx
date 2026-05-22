import type { ReactNode } from "react";

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-navy/15 bg-card/80 p-6 text-sm leading-relaxed text-navy shadow-soft">
      <div className="mb-3 text-xs uppercase tracking-[0.32em] text-accent">
        Важно
      </div>
      {children}
    </div>
  );
}
