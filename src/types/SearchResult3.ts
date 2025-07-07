import type { Album } from "./Album";
import type { Artist } from "./Artist";
import type { Song } from "./Song";

export interface SearchResult3 {
  'subsonic-response' : {
    searchResult3 : {
      album: Album[];
      artist: Artist[];
      song: Song[];
    }
  }
}