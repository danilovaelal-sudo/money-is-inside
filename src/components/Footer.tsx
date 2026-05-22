import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 px-4 py-10 text-sm text-navy/65 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>Пространство для личного исследования, дневника и маленьких шагов.</p>
        <div className="flex flex-wrap gap-4 uppercase tracking-[0.2em]">
          <Link href="/path">Маршрут</Link>
          <Link href="/journal">Дневник</Link>
          <Link href="/map">Карта</Link>
        </div>
      </div>
    </footer>
  );
}
