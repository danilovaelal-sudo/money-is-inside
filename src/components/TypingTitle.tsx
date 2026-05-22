"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TypingTitleProps {
  text: string;
  className?: string;
}

export function TypingTitle({ text, className }: TypingTitleProps) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <h1 className={cn("whitespace-pre-line", className)}>
      {visibleText}
      <span className="animate-pulse text-accent">|</span>
    </h1>
  );
}
