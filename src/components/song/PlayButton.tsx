import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";

export default function PlayButton({ song }:{ song: Song }) {
    const { handleSongClick } = useSongPlayer();

    return <button onClick={() => {
      if (song) handleSongClick(song);
    }}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
}