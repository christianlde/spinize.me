import { useCoverArt } from "../../hooks/useCoverArt";
import AutoImage from "../AutoImage";
import type { Playlist } from "../../types/Playlist";

interface PlaylistItemProps {
  item: Playlist;
  minimalist?: boolean;
}

export default function PlaylistItem({ item, minimalist = false }: PlaylistItemProps) {
  const { cover, loading } = useCoverArt(item.id);

  return (
    <li className="w-full max-w-[100vw] flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Cover image */}
        <div className="relative w-fit grid rounded-lg place-items-center text-white font-semibold text-3xl">
          {!loading ? (
            <AutoImage
              src={cover}
              alt={`${item.name} cover art`}
              className="relative max-w-10 h-full object-cover aspect-square rounded-lg bg-black"
              width={48}
              height={48}
              loading='lazy'
              type="playlist"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 animate-pulse" /> // placeholder
          )}
        </div>

        {/* Playlist text details */}
        {
          minimalist && (
            <div className="py-1 w-50 sm:w-96 md:w-96 lg:w-150 h-full flex flex-col gap-0 justify-start items-start">
              <p className="text-md truncate w-fit max-w-[65vw]">
                {item.name}
              </p>
              <small>{item.owner}</small>
            </div>
          )
        }
        </div>
    </li>
  );
}
