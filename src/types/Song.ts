import type { Artist } from "./Artist";
import type { ReplayGain } from "./Required";

export interface Song {
  track?: number;
  blob?: Blob;
  url?: string; // Used for Radio Station Stream Url
  cover?: string; // Used for Radio Station Logo

  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  year: number;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  duration: number;
  bitRate: number;
  path: string;
  playCount: number;
  created: string; // ISO 8601 timestamp
  albumId: string;
  artistId: string;
  type: string; // likely "music"
  isVideo: boolean;
  played?: string; // ISO 8601 timestamp | undefined
  bpm: number;
  comment: string;
  sortName: string;
  mediaType: string; // likely "song"
  musicBrainzId: string;
  genres: string[];
  replayGain: ReplayGain;
  channelCount: number;
  samplingRate: number;
  bitDepth: number;
  moods: string[];
  artists: Artist[];
  displayArtist: string;
  albumArtists: Artist[];
  displayAlbumArtist: string;
  // contributors: any[]; // Unclear structure, keeping generic
  displayComposer: string;
  explicitStatus: string;
}