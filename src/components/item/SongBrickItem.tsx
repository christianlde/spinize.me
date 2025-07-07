import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import type { Song } from "../../types/Song";
import { useSongPlayer } from "../../context/useSongPlayer";
import { useCoverArt } from "../../hooks/useCoverArt";
import PlayingIcon from "../player/PlayingIcon";
import AutoImage from "../AutoImage";

interface SongListItemProps {
  song: Song;
  minimal?: boolean;
  isInQueue?: boolean;
}

export default function SongBrickItem({ song, minimal }: SongListItemProps) {
  const { currentSong, handleSongClick } = useSongPlayer();
  const { cover, loading } = useCoverArt(song.id);
  const isPlaying = currentSong?.id === song.id;

  return (
    <button
      onClick={() => handleSongClick(song)}
      className="snap-start group cursor-pointer w-full flex items-center justify-between border-b last:border-none bg-600 hover:bg-700 transition-all duration-200 rounded-md overflow-hidden pr-2">
      <div className="flex items-center gap-4">
        {/* Image + overlay container */}
        <div className="relative w-[72px] h-[72px] min-w-[72px]">
          {!loading ? (
            <>
              <AutoImage
                src={cover}
                alt={`${song.album} cover art`}
                className="w-full h-full object-cover bg-black"
                width={72}
                height={72}
                loading="lazy"
                type="song"
              />
              {isPlaying ? (
                <div className="absolute inset-0 grid place-items-center bg-black/50">
                  <PlayingIcon />
                </div>
              ) : (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 grid place-items-center text-white">
                  <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-zinc-800 animate-pulse" />
          )}
        </div>

        {/* Song text details */}
        <div className="py-1 flex flex-col justify-start items-start w-fit max-w-[calc(100%-80px)]">
          <p className="text-sm font-semibold truncate w-fit">{song.title}</p>
          <p className="text-xs truncate w-fit">{song.artist}</p>
          {!minimal && (
            <p className="text-xs truncate w-fit">{`${song.album} (${song.year})`}</p>
          )}
        </div>
      </div>
    </button>
  );
}
