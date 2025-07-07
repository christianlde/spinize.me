import { useSongPlayer } from "../../context/useSongPlayer";
import type { Song } from "../../types/Song";
import FormatDuration from "../tools/FormatDuration";
import { useCoverArt } from "../../hooks/useCoverArt";
import PlayingIcon from "../player/PlayingIcon";
import AddSongToQueueButton from "../song/AddSongToQueueButton";
import AutoImage from "../AutoImage";

interface SongCardProps {
  isStarred?: boolean;
  song: Song;
}

export default function SongCard({ isStarred, song }: SongCardProps) {
  const { currentSong, handleSongClick } = useSongPlayer();
  const { cover, loading } = useCoverArt(song.id);

  return (
    <div className={`snap-start relative aspect-square rounded-lg overflow-hidden shadow-lg border-1 ${isStarred ? 'border-color-golden' : 'border-color-500'} group`}>
      <button className="block w-full h-full cursor-pointer" onClick={() => handleSongClick(song)}>
        {/* Image */}
        {(!loading && cover !== undefined) ? (
          <AutoImage
            src={cover}
            alt={`${song.album} cover art`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            width={248} // Set width for Image component
            height={248} // Set height for Image component
            loading='lazy'
            type="song"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 animate-pulse" /> // placeholder
        )}
        {
          currentSong?.id == song.id && (
            <div className="absolute top-2 right-2 w-[2rem] h-auto aspect-square bg-black/75 rounded-lg">
                <PlayingIcon />
            </div>
          )
        }

        {isStarred && <div className="absolute top-0 left-0 w-0 h-0 border-t-[1.5rem] md:border-t-[4rem] border-r-[2rem] lg:border-r-[6rem] border-t-color-golden border-r-transparent"></div>}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-between p-2 text-white">
          <div className='flex flex-row justify-start items-center'>
            <p className="text-xs bg-black/50 p-1 rounded-md w-fit"><FormatDuration duration={song.duration} /></p>
          </div>

          <div className='text-left'>
            <h3 className="text-sm font-semibold truncate">{song.title || 'Unknown'}</h3>
            <p className="text-xs truncate text-gray-400">{song.artist || 'Unknown artist'}</p>
            <p className="text-xs truncate text-gray-400 italic">{song.album || 'Unknown album'} ({song.album || 'Unknown year'})</p>
          </div>
        </div>
      </button>

      <div className='absolute top-9 left-2'>
        <AddSongToQueueButton song={song} />
      </div>
    </div>
  );
};
