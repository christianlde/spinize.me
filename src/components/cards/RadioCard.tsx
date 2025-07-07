import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";
import AutoImage from "../AutoImage";

interface Props {
  station: {
    name: string;
    url_resolved: string;
    favicon: string;
    homepage: string;
    country: string;
    tags: string;
  };
}

export default function RadioCard({ station }: Props) {
  const { currentSong, live, handleSongClick, setLive, unsetSong } = useSongPlayer();

  const isCurrent = currentSong?.id === station.url_resolved;
  const isPlaying = isCurrent && live;

  const onPlayClick = () => {
    if (isPlaying && isCurrent) {
      unsetSong();
    } else {
      handleSongClick({
        id: station.url_resolved,
        title: station.name,
        url: station.url_resolved,
        artist: station.country || "Public Radio",
        album: station.homepage || "Public Radio Station",
        cover: station.favicon || "/radioCover.jpg",
        duration: 0,
        type: "radio",
      } as Song);
      setLive(true);
    }
  };

  return (
    <button
      onClick={onPlayClick}
      className={`rounded-xl transition-all duration-100 p-2 md:p-4 shadow flex flex-col sm:flex-row xl:flex-col items-center xl:items-start gap-2 md:gap-4 border-2 bg-zinc-900 ${isCurrent && isPlaying ? 'border-color-golden hover:bg-zinc-950' : 'border-transparent hover:bg-700'}`}>
      {/* Radio logo and details */}
      <div className="flex flex-row items-center justify-between gap-2 w-full">
        {
          station.favicon ? (
            <AutoImage
              src={station.favicon ?? "/default-radio-icon.png"}
              alt={`${station.name} logo`}
              className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-full"
              type="radio"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 animate-pulse" /> // placeholder
          )
        }
        <div className="flex flex-col text-left md:text-center sm:text-left max-w-[14rem] sm:max-w-[7rem] xl:max-w-[7rem] 2xl:max-w-[10rem] w-full">
          <p className="font-semibold text-white truncate">{station.name}</p>
          <small className="text-gray-300 truncate">{station.country}</small>
        </div>
      </div>

      {/* Play/Pause button */}
      <p className={`px-3 py-2 mt-2 sm:mt-0 text-sm rounded-md bg-black/50 ${isCurrent && isPlaying ? 'bg-golden text-black font-semibold' : 'text-white'}`}>
        {isCurrent && isPlaying ? "Stop listening" : "Start station"}
      </p>
    </button>
  );
}
