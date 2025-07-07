// hooks/useMostPlayed.ts
import { useEffect, useState } from "react";
import { getMostPlayedFromDB } from "../lib/playHistoryDB"; // assume you have a helper
import type { Song } from "../types/Song";

export function useMostPlayed() {
  const [mostPlayed, setMostPlayed] = useState<Song[]>([]);

  useEffect(() => {
    getMostPlayedFromDB().then((songs: Song[]) => setMostPlayed(songs));
  }, []);

  return { mostPlayed };
}
