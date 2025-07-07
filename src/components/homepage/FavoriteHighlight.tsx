import { useEffect, useState } from "react";
import { useStarred } from "../../hooks/useStarred";
import { useMostPlayed } from "../../hooks/useMostPlayed"; // Returns: PlayHistoryEntry[] | null
import type { Song } from "../../types/Song";
import DataSection from "../DataSection";

export default function FavoriteHighlight() {
  const { starred } = useStarred();
  const { mostPlayed } = useMostPlayed(); // Returns: Song[] | null

  const [highlights, setHighlights] = useState<Song[] | null>(null); // Default is null for skeletons

  useEffect(() => {
    if (!starred?.song || !mostPlayed) return;

    const starredIds = new Set(starred.song.map((s) => s.id));

    // Filter songs in mostPlayed that are also starred, and map to Song[] array
    const intersection = mostPlayed
      .filter((song: Song) => starredIds.has(song.id))
      .map((song: Song) => song);

    setHighlights(intersection.length > 0 ? intersection.slice(0, 20) : []); // Top 20 overlap
  }, [starred, mostPlayed]);

  return (
    <DataSection
      type="favorite highlight"
      starred={starred}
      data={highlights}
      viewAll={false}
    />
  );
}
