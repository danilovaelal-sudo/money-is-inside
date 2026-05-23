import type { ReactNode } from "react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollTopButton } from "@/components/ScrollTopButton";

export function Layout({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-navy">
      <AnimatedBackground />
      <Header />
      <main className={`relative z-10 mx-auto max-w-7xl px-4 pb-16 md:px-6 ${className}`}>
        {children}
      </main>
      <ScrollTopButton />
      <Footer />
    </div>
  );
}
