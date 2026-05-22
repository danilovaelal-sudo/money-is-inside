export type PracticeQuestionType =
  | "text"
  | "textarea"
  | "scale"
  | "choice"
  | "multiChoice";

export interface PracticeQuestion {
  id: string;
  label: string;
  helperText?: string;
  type: PracticeQuestionType;
  options?: string[];
  required?: boolean;
}

export interface SmallAction {
  title: string;
  description: string;
  doneLabel: string;
  laterLabel: string;
}

export interface CreativeTask {
  title: string;
  description: string;
  fields: PracticeQuestion[];
}

export interface PracticeDay {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  theme: string;
  intro: string;
  mainQuestion: string;
  questions: PracticeQuestion[];
  smallAction: SmallAction;
  creativeTask: CreativeTask;
  mapField: string;
  decorativeWords: string[];
  category: string;
}

export interface DayAnswer {
  dayId: number;
  answers: Record<string, string | number | string[]>;
  creativeAnswers?: Record<string, string | number | string[]>;
  emotionalState?: string;
  finalInsight?: string;
  smallActionDone?: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface UserProgress {
  userName?: string;
  startedAt?: string;
  mode?: "daily" | "free" | "slow";
  selectedRequests: string[];
  completedDays: number[];
  currentDay: number;
  answers: Record<number, DayAnswer>;
  updatedAt?: string;
}
