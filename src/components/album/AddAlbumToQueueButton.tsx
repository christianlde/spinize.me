'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";

export default function AddAlbumToQueueButton({ playlist, minimalist = false }:{ playlist: Song[], minimalist?: boolean }) {
  const { addPlaylistToQueue } = useSongPlayer();

  if (!playlist) return null; // Return null if no song is provided

  return <button onClick={() => {
    if (playlist) addPlaylistToQueue(playlist);
  }}
  >
    <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faListOl} />
  </button>
}