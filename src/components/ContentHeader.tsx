import { Link } from "react-router-dom";
import { useCoverArt } from "../hooks/useCoverArt";
import { useRandomSongs } from "../hooks/useRandomSongs";
import PlayButton from "./song/PlayButton";
import AddSongToQueueButton from "./song/AddSongToQueueButton";
import AutoImage from "./AutoImage";

export default function ContentHeader() {
    const { songs } = useRandomSongs();
    const song = songs ? songs[0] : null;
    const { cover } = useCoverArt(song ? song.id : undefined);

    if (songs == null) return (
        <section className="relative w-full h-full max-h-[50svh] aspect-square md:aspect-video bg-zinc-700 rounded-md border-t-6 border-color-500 overflow-hidden animate-pulse">
        {/* Background Image Placeholder */}
        <div className="w-full h-full bg-zinc-800 object-cover" />

        {/* Overlay Text Skeleton */}
        <div className="z-[2] absolute inset-0 p-2 w-full h-full flex flex-col justify-end items-start gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <div className="w-2/3 h-6 bg-zinc-600 rounded" />
            <div className="w-1/3 h-5 bg-zinc-600 rounded" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="absolute right-2 bottom-2 z-[5] flex flex-row gap-2 items-center">
            <div className="w-10 h-10 bg-zinc-600 rounded-md" />
            <div className="w-10 h-10 bg-zinc-600 rounded-md" />
        </div>
        </section>
    );

    return <section id="content-header" className="relative w-full h-full max-h-[50svh] aspect-square md:aspect-video bg-500 rounded-md border-t-6 border-color-500 overflow-hidden">
        {
            song && (<Link to={`/app/songs/${song.id}`} className="w-full h-full">
            {
                cover ? (
                    <AutoImage
                        type="song"
                        src={cover}
                        alt={song.title}
                        width={1280}
                        height={1280}
                        className="object-cover w-full h-full"
                        loading="eager"
                        />
                ) : (
                    <div className="w-full h-full bg-zinc-800 animate-pulse" /> // placeholder
                )
            }
                <div className="z-[2] absolute inset-0 p-2 w-full h-full flex flex-col justify-end items-start gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h2 className="text-3xl font-bold">{song.title}</h2>
                    <h2 className="text-xl font-semibold">{song.artist}</h2>
                </div>
            </Link>)
        }

        {
            song && (
                <div className="absolute right-2 bottom-2 z-[5] flex flex-row gap-2 items-center">
                <PlayButton song={song} />
                <AddSongToQueueButton song={song} />
            </div>
            )
        }
    </section>
}