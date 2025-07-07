import type { Song } from "./Song";

export interface PlayHistoryEntry {
  id?: number;
  songId: string;
  song: Song;
  playedAt: number;
}