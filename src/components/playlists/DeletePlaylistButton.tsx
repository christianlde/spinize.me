import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getCredentials } from "../../lib/credentials";
import axios from "axios";
import { CLIENT, VERSION } from "../../pages/Home";

export default function DeletePlaylistButton({ playlistId }: { playlistId: string }) {
  const navigate = useNavigate();

  async function deletePlaylist() {
    try {
      const creds = await getCredentials();
      if (!creds) return;

      await axios.get(`${creds.url}/rest/deletePlaylist`, {
        params: {
          u: creds.username,
          t: creds.token,
          s: creds.salt,
          c: CLIENT,
          v: VERSION,
          f: 'json',
          id: playlistId,
        }
      });

      console.log(`Playlist ${playlistId} deleted.`);
      navigate('/playlists'); // Go back to the list after deletion

    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  }

  return (
    <button onClick={deletePlaylist} className="flex flex-row gap-1 items-center w-fit text-red-500 hover:text-red-700">
      Delete playlist
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
