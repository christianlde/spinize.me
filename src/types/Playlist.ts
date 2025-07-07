import type { Song } from "./Song";

export interface Playlist {
  id: string;
  name: string;
  comment: string;
  songCount: number;
  duration: number;
  public: boolean;
  owner: string;
  created: string;
  changed: string;
  coverArt: string;
  entry: Song[];
}