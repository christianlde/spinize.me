'use client';

import { useFilters } from "../../hooks/useFilters";
import type { Album } from "../../types/Album";
import type { Artist } from "../../types/Artist";
import type { Song } from "../../types/Song";
import type { Starred } from "../../types/Starred";
import DataSection from "../DataSection";

interface Props {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
  starred: Starred | null;
}

export default function SearchResults({ songs, albums, artists, starred }: Props) {
  const { filters } = useFilters();

  return (
    <div className='flex flex-col gap-8'>
      {filters.songs && <DataSection type="songs" data={songs} starred={starred} />}

      {filters.albums && <DataSection type="albums" data={albums} starred={starred} />}

      {filters.artists && <DataSection type="artists" data={artists} starred={starred} />}
    </div>
  );
}
