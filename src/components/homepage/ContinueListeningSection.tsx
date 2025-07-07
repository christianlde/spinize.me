import { usePlayHistory } from "../../hooks/usePlayHistory";
import type { Song } from "../../types/Song";
import DataSection from "../DataSection";
import { useStarred } from "../../hooks/useStarred";
import type { PlayHistoryEntry } from "../../types/PlayHistory";
import { useEffect, useState } from "react";

export default function ContinueListeningSection() {
  const { history, error } = usePlayHistory();
  const { starred } = useStarred();

  // You can optionally limit the number of recent items
  const [recentTracks, setRecentTracks] = useState<Song[] | null>(null); // Default is null

  useEffect(() => {
    const recentTracksEntry: PlayHistoryEntry[] = history.slice(0, 10); // Adjust limit as needed
    // Use a Set to filter out duplicate songs based on songId
    const seenSongIds = new Set();

    // Create a new array for unique songs
    const uniqueTracks = recentTracksEntry.reduce((acc, entry) => {
      if (!seenSongIds.has(entry.song.id)) {
        seenSongIds.add(entry.song.id);
        acc.push(entry.song);
      }
      return acc;
    }, [] as Song[]);

    // Only set the state if there are unique tracks
    setRecentTracks(uniqueTracks.length > 0 ? uniqueTracks : []);
  }, [history]); // Ensure this effect runs when recentTracksEntry changes

  if (error) return <div>Error loading play history</div>;

  return (
    <DataSection
      type="recently played"
      starred={starred}
      data={recentTracks}
      viewAll={false}
    />
  );
}
