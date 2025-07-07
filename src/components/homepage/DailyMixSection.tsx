import { useStarred } from "../../hooks/useStarred";
import DataSection from "../DataSection";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function DailyMixSection() {
  const { starred } = useStarred();

  const dailyMix = shuffleArray(starred?.song || []).slice(0, 20); // Random 20 songs

  return (
    <DataSection
      type="daily mix"
      starred={starred}
      data={dailyMix.length ? dailyMix : []}
      viewAll={false}
    />
  );
}
