import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getCredentials } from "../../lib/credentials";
import axios from "axios";
import { CLIENT, VERSION } from "../../pages/Home";

export default function CreateNewPlaylistButton({ minimalist = false }: { minimalist?: boolean }) {
  const navigate = useNavigate();

  async function createNewPlaylist() {
    try {
      const creds = await getCredentials();
      if (!creds) return;

      const res = await axios.get(`${creds.url}/rest/createPlaylist`, {
        params: {
          u: creds.username,
          t: creds.token,
          s: creds.salt,
          c: CLIENT,
          v: VERSION,
          f: 'json',
          name: 'new playlist',
        }
      });

      const playlistId = res.data["subsonic-response"]?.playlist?.id;
      if (playlistId) {
        console.log('Playlist created:', playlistId);
        navigate(`/playlists/${playlistId}`);
      } else {
        console.warn('No playlist ID returned.');
      }

    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }

  return (
    <button onClick={createNewPlaylist} className="flex flex-row gap-1 items-center w-fit p-2 rounded-md hover:bg-black/50 transition-all duration-100">
      {!minimalist && 'Create new playlist'}
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
