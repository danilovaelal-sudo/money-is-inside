"use client";

import Link from "next/link";
import { useState } from "react";

import { FullScreenMenu } from "@/components/FullScreenMenu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.35em] text-navy"
          >
            Деньги внутри
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center border border-navy/30 bg-card/70 text-navy backdrop-blur-sm transition hover:bg-accent hover:text-navy"
            aria-label="Открыть меню"
          >
            ≡
          </button>
        </div>
      </header>
      <FullScreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
