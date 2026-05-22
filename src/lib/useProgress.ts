"use client";

import { useEffect, useState } from "react";

import {
  completeDay,
  defaultProgress,
  getProgress,
  resetProgress,
  saveProgress,
  updateDayAnswer,
  updateProgress
} from "@/lib/storage";
import type { DayAnswer, UserProgress } from "@/types";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setProgress(getProgress());
      setIsReady(true);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(
      "money-inside-progress-updated",
      sync as EventListener
    );

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(
        "money-inside-progress-updated",
        sync as EventListener
      );
    };
  }, []);

  return {
    progress,
    isReady,
    save(nextValue: UserProgress) {
      const saved = saveProgress(nextValue);
      setProgress(saved);
    },
    update(updater: (current: UserProgress) => UserProgress) {
      const saved = updateProgress(updater);
      setProgress(saved);
    },
    updateDay(dayId: number, patch: Partial<DayAnswer>) {
      const saved = updateDayAnswer(dayId, patch);
      setProgress(saved);
    },
    complete(dayId: number) {
      const saved = completeDay(dayId);
      setProgress(saved);
    },
    reset() {
      const saved = resetProgress();
      setProgress(saved);
    }
  };
}
