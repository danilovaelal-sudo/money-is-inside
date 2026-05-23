import { practiceDays } from "@/data/practiceDays";

import { DayPageClient } from "./DayPageClient";

export function generateStaticParams() {
  return practiceDays.map((day) => ({
    id: String(day.id)
  }));
}

export default async function DayPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <DayPageClient dayId={Number(id)} />;
}
