import Link from "next/link";

import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout className="flex min-h-[70vh] items-center">
      <section className="rounded-[36px] border border-navy/15 bg-card/80 p-8 shadow-card">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">404</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9]">
          Страница не найдена
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-navy/72">
          Попробуйте вернуться на главную или открыть маршрут, чтобы продолжить
          путь.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-navy"
          >
            На главную
          </Link>
          <Link
            href="/path"
            className="rounded-full border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]"
          >
            К маршруту
          </Link>
        </div>
      </section>
    </Layout>
  );
}
