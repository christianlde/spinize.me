import { usePlayHistory } from "../../hooks/usePlayHistory";
import { useMemo } from "react";
import type { Song } from "../../types/Song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faCompactDisc, faMicrophoneLines, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Stats() {
  const { history } = usePlayHistory();

  const {
    totalListens,
    mostPlayedSong,
    mostPlayedAlbum,
    mostPlayedArtist,
    uniqueSongCount,
    uniqueAlbumCount,
    uniqueArtistCount,
  } = useMemo(() => {
    if (!history || history.length === 0) {
      return {
        totalListens: 0,
        mostPlayedSong: null,
        mostPlayedAlbum: null,
        mostPlayedArtist: null,
        uniqueSongCount: 0,
        uniqueAlbumCount: 0,
        uniqueArtistCount: 0,
      };
    }

    const songCountMap = new Map<string, { song: Song; count: number }>();
    const albumCountMap = new Map<string, { name: string; count: number }>();
    const artistCountMap = new Map<string, { name: string; count: number }>();

    for (const entry of history) {
      const song = entry.song;

      // Songs
      const existingSong = songCountMap.get(song.id);
      if (existingSong) {
        existingSong.count += 1;
      } else {
        songCountMap.set(song.id, { song, count: 1 });
      }

      // Albums
      const albumKey = song.albumId ?? "unknown";
      const albumName = song.album ?? "Unknown Album";
      const existingAlbum = albumCountMap.get(albumKey);
      if (existingAlbum) {
        existingAlbum.count += 1;
      } else {
        albumCountMap.set(albumKey, { name: albumName, count: 1 });
      }

      // Artists
      const artistKey = song.artistId ?? "unknown";
      const artistName = song.artist ?? "Unknown Artist";
      const existingArtist = artistCountMap.get(artistKey);
      if (existingArtist) {
        existingArtist.count += 1;
      } else {
        artistCountMap.set(artistKey, { name: artistName, count: 1 });
      }
    }

    // Helper: get top entry
    // const getTop = <T,>(map: Map<string, { name?: string; song?: Song; count: number }>) => {
    const getTop = (map: Map<string, { name?: string; song?: Song; count: number }>) => {
      let maxEntry: { name?: string; song?: Song; count: number } = { count: 0, };
      map.forEach((entry) => {
        if (!maxEntry || entry.count > maxEntry.count) {
          maxEntry = entry;
        }
      });
      return maxEntry;
    };

    return {
      totalListens: history.length,
      mostPlayedSong: getTop(songCountMap)?.song ?? null,
      mostPlayedAlbum: getTop(albumCountMap)?.name ?? null,
      mostPlayedArtist: getTop(artistCountMap)?.name ?? null,
      uniqueSongCount: songCountMap.size,
      uniqueAlbumCount: albumCountMap.size,
      uniqueArtistCount: artistCountMap.size,
    };
  }, [history]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4"><FontAwesomeIcon icon={faArrowTrendUp} className="text-golden" /> Your Listening Stats</h2>
      <ul className="space-y-2">
        <li><strong>Total Listens:</strong> {totalListens}</li>
        <li><strong>Unique Songs:</strong> {uniqueSongCount}</li>
        <li><strong>Unique Albums:</strong> {uniqueAlbumCount}</li>
        <li><strong>Unique Artists:</strong> {uniqueArtistCount}</li>
        <li><strong><FontAwesomeIcon icon={faMusic} className="text-golden" /> Most Played Song:</strong> <Link to={`/search/${mostPlayedSong?.title ?? "N/A"}`}>
          {mostPlayedSong?.title ?? "N/A"}
        </Link> by <Link to={`/search/${mostPlayedSong?.artist ?? "Unknown"}`}>
          {mostPlayedSong?.artist ?? "Unknown"}
        </Link></li>
        <li><strong><FontAwesomeIcon icon={faCompactDisc} className="text-golden" /> Most Played Album:</strong> <Link to={`/search/${mostPlayedAlbum ?? "N/A"}`}>
            {mostPlayedAlbum ?? "N/A"}
          </Link></li>
        <li><strong><FontAwesomeIcon icon={faMicrophoneLines} className="text-golden" /> Most Played Artist:</strong> <Link to={`/search/${mostPlayedArtist ?? 'N/A'}`}>
          {mostPlayedArtist ?? "N/A"}
          </Link></li>
      </ul>
    </div>
  );
}
