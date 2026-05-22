import Link from "next/link";

import { Layout } from "@/components/Layout";
import { LITRES_BOOK_URL } from "@/lib/constants";

export default function BookPage() {
  return (
    <Layout className="space-y-8 pt-6 md:pt-10">
      <section className="max-w-5xl space-y-6">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          Книга
        </p>
        <h1 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
          КНИГА «ДЕНЬГИ ВНУТРИ»
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-navy/72">
          Книга раскрывает путь глубже, чем приложение: через главы, размышления
          и внутренние смыслы. Приложение помогает пройти эту книгу практически:
          через вопросы, дневник, маленькие действия и личную карту.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          [
            "О чём книга",
            "О страхах, установках, стыде, теле, желании, творчестве, смысле и новых правилах обращения с деньгами."
          ],
          [
            "Для кого книга",
            "Для тех, кто хочет посмотреть честно на свой внутренний механизм и пройти путь без давления."
          ],
          [
            "Чем отличается от приложения",
            "Книга даёт глубину и развёрнутый контекст, а приложение переводит этот путь в практику, дневник и маленькие шаги."
          ]
        ].map(([title, text]) => (
          <article
            key={title}
            className="rounded-[30px] border border-navy/15 bg-card/80 p-6 shadow-soft"
          >
            <h2 className="text-2xl font-black uppercase leading-none">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-navy/72">{text}</p>
          </article>
        ))}
      </section>

      <Link
        href={LITRES_BOOK_URL}
        target="_blank"
        className="inline-flex rounded-full bg-accent px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-navy"
      >
        Купить на Литрес
      </Link>
    </Layout>
  );
}
