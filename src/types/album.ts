import type { Artist } from "./Artist";
import type { PartialDate } from "./Required";
import type { Song } from "./Song";

export interface Album {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number; // duration in seconds
  created: string; // ISO date string
  year: number;
  userRating: number;
  genres: string[];
  musicBrainzId: string;
  isCompilation: boolean;
  sortName: string;
  discTitles: string[];
  originalReleaseDate: PartialDate;
  releaseDate: PartialDate;
  releaseTypes: string[];
  recordLabels: string[];
  moods: string[];
  artists: Artist[];
  displayArtist: string;
  explicitStatus: string;
  version: string;
  song: Song[];
}