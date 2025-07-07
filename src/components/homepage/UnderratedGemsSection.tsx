import { useEffect, useState } from "react";
import { useStarred } from "../../hooks/useStarred";
import { usePlayHistory } from "../../hooks/usePlayHistory";
import type { Song } from "../../types/Song";
import type { PlayHistoryEntry } from "../../types/PlayHistory";
import DataSection from "../DataSection";

export default function UnderratedGemsSection() {
  const { starred } = useStarred();
  const { history, error } = usePlayHistory();
  const [underratedGems, setUnderratedGems] = useState<Song[] | null>(null);

  useEffect(() => {
    if (!starred?.album || !starred?.song || !history) {
      setUnderratedGems(null);
      return;
    }

    const playCountMap = history.reduce((acc, entry: PlayHistoryEntry) => {
      const id = entry.song.id;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const starredAlbumIds = new Set(starred.album.map(album => album.id));

    const gems = starred.song
      .filter(song => starredAlbumIds.has(song.albumId))
      .sort((a, b) => {
        const playA = playCountMap[a.id] ?? 0;
        const playB = playCountMap[b.id] ?? 0;
        return playA - playB;
      })
      .slice(0, 20);

    setUnderratedGems(gems.length > 0 ? gems : []);
  }, [starred, history]);

  if (error) return <div>Error loading underrated gems</div>;

  return (
    <DataSection
      type="underrated gems"
      starred={starred}
      data={underratedGems}
      viewAll={false}
    />
  );
}
