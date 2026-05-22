import { practiceDays } from "@/data/practiceDays";
import type { DayAnswer, PracticeDay } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDayNumber(id: number) {
  return id.toString().padStart(2, "0");
}

export function getDayById(id: number): PracticeDay | undefined {
  return practiceDays.find((day) => day.id === id);
}

export function getDayStatus(
  id: number,
  completedDays: number[],
  answers: Record<number, DayAnswer>
) {
  if (completedDays.includes(id)) {
    return "completed";
  }

  if (answers[id]) {
    return "active";
  }

  return "idle";
}

export function getMostCommonEmotion(
  answers: Record<number, DayAnswer>
): Array<{ label: string; count: number }> {
  const tally = Object.values(answers).reduce<Record<string, number>>(
    (acc, answer) => {
      if (answer.emotionalState) {
        acc[answer.emotionalState] = (acc[answer.emotionalState] ?? 0) + 1;
      }
      return acc;
    },
    {}
  );

  return Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label, count]) => ({ label, count }));
}
