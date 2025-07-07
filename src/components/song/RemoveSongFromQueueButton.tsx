import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";

export default function RemoveSongFromQueueButton({ song }:{ song: Song }) {
  const { removeFromQueue } = useSongPlayer();

  if (!song) return null; // Return null if no song is provided

  return <button
    // size="small"
    onClick={() => {
      if (song) removeFromQueue(song);
    }}>
    <FontAwesomeIcon icon={faBroom} className="text-white" />
  </button>
}