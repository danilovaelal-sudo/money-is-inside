import { formatDayNumber } from "@/lib/utils";

export function MapSection({
  index,
  title,
  content
}: {
  index: number;
  title: string;
  content?: string;
}) {
  return (
    <section className="relative rounded-[30px] border border-navy/15 bg-card/75 p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-4xl font-black text-accent">
          {formatDayNumber(index)}
        </span>
        <div className="h-px flex-1 bg-navy/15" />
      </div>
      <h3 className="max-w-xl text-2xl font-black uppercase leading-none text-navy">
        {title}
      </h3>
      <p className="mt-5 text-sm leading-7 text-navy/75">
        {content || "Этот слой ещё не открыт."}
      </p>
    </section>
  );
}
