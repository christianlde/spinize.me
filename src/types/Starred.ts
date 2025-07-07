import { type Album } from "./Album";
import { type Artist } from "./Artist";
import { type Song } from "./Song";

export interface Starred {
  album: Album[];
  artist: Artist[];
  song: Song[];
}

export interface StarredItem {
  starred: boolean;
}