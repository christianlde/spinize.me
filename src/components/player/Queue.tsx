import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faListOl, faBroom } from "@fortawesome/free-solid-svg-icons";

import type { Song } from "../../types/Song";
import { useSongPlayer } from "../../context/useSongPlayer";
import SongQueueItem from "../lists/SongQueueItem";

export default function Queue() {
    const { queue, shuffle, clearQueue, setShuffle } = useSongPlayer();

    return (
        <div className="w-full h-[80svh] p-4 xl:p-2 2xl:p-0">
            <div className="flex flex-row justify-between items-center gap-1">
                <h2>View queue</h2>

                <div className="flex flex-row gap-2 text-white/70 items-center">
                    <button className="aspect-square" onClick={() => setShuffle(!shuffle)}>
                        <FontAwesomeIcon icon={shuffle ? faShuffle : faListOl} />
                    </button>
                    <button className="aspect-video" onClick={clearQueue}>
                        <FontAwesomeIcon icon={faListOl} /> <FontAwesomeIcon icon={faBroom} />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                {
                    queue.length === 0 ? (
                        <p className="text-gray-300">No songs in queue</p>
                    ) : (
                        queue.map((song: Song) => (
                            <SongQueueItem
                                key={song.id}
                                song={song}
                                minimal={true}
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
}
