import Link from "next/link";

import { LITRES_BOOK_URL } from "@/lib/constants";

export function BookCta() {
  return (
    <section className="rounded-[36px] border border-navy/15 bg-ink px-6 py-10 text-milk shadow-card md:px-10">
      <div className="mb-6 text-xs uppercase tracking-[0.32em] text-accent">
        Книга
      </div>
      <h2 className="mb-5 max-w-3xl whitespace-pre-line text-4xl font-black uppercase leading-[0.9] md:text-6xl">
        {"КНИГА, ИЗ КОТОРОЙ\nВЫРОС ЭТОТ ПУТЬ"}
      </h2>
      <p className="max-w-2xl text-sm leading-7 text-milk/80 md:text-base">
        Приложение не заменяет книгу. Оно помогает пройти её через вопросы,
        дневник, тело и маленькие действия. Если хочется глубины, можно
        прочитать полную версию на Литрес.
      </p>
      <Link
        href={LITRES_BOOK_URL}
        target="_blank"
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-navy transition hover:scale-[1.02]"
      >
        Купить книгу на Литрес
      </Link>
    </section>
  );
}
