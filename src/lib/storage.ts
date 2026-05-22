import { STORAGE_KEY } from "@/lib/constants";
import type { DayAnswer, UserProgress } from "@/types";

export const defaultProgress: UserProgress = {
  selectedRequests: [],
  completedDays: [],
  currentDay: 1,
  answers: {}
};

const isBrowser = typeof window !== "undefined";

function emitChange(nextValue: UserProgress) {
  if (!isBrowser) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("money-inside-progress-updated", {
      detail: nextValue
    })
  );
}

export function getProgress(): UserProgress {
  if (!isBrowser) {
    return defaultProgress;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultProgress;
  }

  try {
    const parsed = JSON.parse(raw) as UserProgress;
    return {
      ...defaultProgress,
      ...parsed,
      selectedRequests: parsed.selectedRequests ?? [],
      completedDays: parsed.completedDays ?? [],
      answers: parsed.answers ?? {}
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): UserProgress {
  const nextValue = {
    ...defaultProgress,
    ...progress,
    updatedAt: new Date().toISOString()
  };

  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextValue));
    emitChange(nextValue);
  }

  return nextValue;
}

export function updateProgress(
  updater: (current: UserProgress) => UserProgress
): UserProgress {
  const current = getProgress();
  return saveProgress(updater(current));
}

export function updateDayAnswer(
  dayId: number,
  patch: Partial<DayAnswer>
): UserProgress {
  return updateProgress((current) => {
    const existing = current.answers[dayId];
    const nextAnswers = patch.answers ?? existing?.answers ?? {};
    const nextUpdatedAt = patch.updatedAt ?? new Date().toISOString();
    const nextAnswer: DayAnswer = {
      ...existing,
      ...patch,
      dayId,
      answers: nextAnswers,
      updatedAt: nextUpdatedAt
    };

    return {
      ...current,
      answers: {
        ...current.answers,
        [dayId]: nextAnswer
      },
      currentDay: Math.max(current.currentDay, dayId)
    };
  });
}

export function completeDay(dayId: number): UserProgress {
  return updateProgress((current) => {
    const completedDays = current.completedDays.includes(dayId)
      ? current.completedDays
      : [...current.completedDays, dayId].sort((a, b) => a - b);

    const existing = current.answers[dayId];
    const now = new Date().toISOString();
    const nextAnswer: DayAnswer = {
      ...existing,
      dayId,
      answers: existing?.answers ?? {},
      completedAt: existing?.completedAt ?? now,
      updatedAt: now
    };

    return {
      ...current,
      completedDays,
      currentDay: Math.min(15, Math.max(current.currentDay, dayId + 1)),
      answers: {
        ...current.answers,
        [dayId]: nextAnswer
      }
    };
  });
}

export function resetProgress(): UserProgress {
  if (isBrowser) {
    window.localStorage.removeItem(STORAGE_KEY);
    emitChange(defaultProgress);
  }

  return defaultProgress;
}

export function getCompletedDaysCount(): number {
  return getProgress().completedDays.length;
}

export function getCurrentDay(): number {
  return getProgress().currentDay || 1;
}
