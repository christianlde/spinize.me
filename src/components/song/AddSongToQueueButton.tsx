import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";

export default function AddSongToQueueButton({ song }:{ song: Song }) {
  const { addToQueue } = useSongPlayer();

  if (!song) return null; // Return null if no song is provided

  return <button
    className="flex flex-row justify-center items-center"
    onClick={() => {
      if (song) addToQueue(song);
    }}>
    <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faListOl} />
  </button>
}