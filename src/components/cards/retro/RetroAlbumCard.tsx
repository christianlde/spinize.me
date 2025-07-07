import { useSongPlayer } from "../../../context/useSongPlayer";
import { useCoverArt } from "../../../hooks/useCoverArt";
import type { Album } from "../../../types/Album";
import AutoImage from "../../AutoImage";
import PlayingIcon from "../../player/PlayingIcon";

interface AlbumCardProps {
  isStarred?: boolean;
  album: Album;
}

export default function AlbumCard({ isStarred, album }: AlbumCardProps) {
  const { currentSong } = useSongPlayer();
  const { cover, loading } = useCoverArt(album.id);
  const albumUrl = `/albums/${album.id}`;

  return (
    <div className={`relative aspect-[11/10] rounded-l-sm rounded-r-lg overflow-hidden shadow-lg border-4 ${isStarred ? 'border-color-golden' : 'border-color-500'} group`}>
      <a href={albumUrl} className="block w-full h-full flex flex-row justify-between items-center">
        <div className='w-[10%] h-full bg-black'></div>

        <div className='relative w-full h-full overflow-hidden'>
          {/* Image */}
          {(!loading && cover !== undefined) ? (
            <AutoImage
              src={cover}
              alt={`${album.name} cover art`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              width={175} // Set width for Image component
              height={175} // Set height for Image component
              loading='lazy'
              type="album"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 animate-pulse" /> // placeholder
          )}
          {
            currentSong?.albumId == album.id && (
              <div className="absolute top-2 right-2 w-[2rem] h-auto aspect-square grid place-items-center bg-black/75 rounded-lg">
                  <PlayingIcon />
              </div>
            )
          }

          {isStarred && <div className="absolute top-0 left-0 w-0 h-0 border-t-[1rem] md:border-t-[3rem] border-r-[1.5rem] lg:border-r-[4rem] border-t-color-golden border-r-transparent"></div>}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-2 text-white">
          <h3 className="text-sm font-semibold truncate">{album.name || 'Unknown album name'}</h3>
          <p className="text-xs truncate text-gray-400">{album.artist || 'Unknown artist name'}</p>
          <p className="text-xs text-gray-400 italic">Released: {album.year || 'Unknown album year'}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
