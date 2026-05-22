import type { ReactNode } from "react";
import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Деньги внутри",
  description:
    "15-дневный интерактивный путь по книге и рабочей тетради «Деньги внутри»."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
