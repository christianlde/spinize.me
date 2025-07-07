import { useEffect, useState } from "react";
import { useSongPlayer } from "../context/useSongPlayer";
import { getCredentials } from "../lib/credentials";
import { CLIENT, VERSION } from "../pages/Home";
import { getSong } from "../lib/songDB";
import { savePlayHistory } from "../lib/playHistoryDB";

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function AudioPlayer({ audioRef }: PlayerProps) {
  const { paused, setPaused, repeat, queue, currentSong, live, replaySong, playNextSong, setReload } = useSongPlayer();
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // Build and set stream URL
  useEffect(() => {
    const build = async () => {
      if (!currentSong?.id) {
        setStreamUrl(undefined);
        setObjectUrl(null);
        return;
      }

      if (live && currentSong.url) {
        setStreamUrl(currentSong.url) // The stream should be the only url loading - in case of a streamed song
        setObjectUrl(null);
        return;
      }

      const local = await getSong(currentSong.id);

      if (local?.blob) {
        const url = URL.createObjectURL(local.blob as Blob);
        setStreamUrl(undefined);
        setObjectUrl(url); // The Blob should be the only url loading - in case of a downloaded song
      } else {
        const creds = await getCredentials();
        if (!creds) return;

        const remoteUrl = `${creds.url}/rest/stream?id=${currentSong.id}&u=${creds.username}&t=${creds.token}&s=${creds.salt}&c=${CLIENT}&v=${VERSION}&format=mp3`;

        setStreamUrl(remoteUrl) // The stream should be the only url loading - in case of a streamed song
        setObjectUrl(null);

        // Add a new listen --- Only for Songs not for radio stations
        savePlayHistory(currentSong);
      }
      setPaused(false);
    };

    build();
  }, [currentSong, live, setPaused]);

  // Handle audio loading and playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentSong) {
      // Clear audio when song is unset
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      return;
    }

    if (!streamUrl && !objectUrl) return;

    if (paused) {
      // Clear audio when song is unset
      audio.pause();
      return;
    }

    const handleCanPlay = () => {
      audio.play().catch((err) => {
        console.warn("Play failed after canplaythrough:", err);
      });
    };

    audio.src = objectUrl ? objectUrl : streamUrl ?? '';
    audio.load();
    audio.addEventListener("canplaythrough", handleCanPlay, { once: true });
    setPaused(false);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      if (objectUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [streamUrl, objectUrl, currentSong, paused, audioRef, setPaused]);

  return (
    <div className="w-[1px] h-[1px] fixed top-0 right-0 bg-black text-white flex flex-col justify-between items-center z-[-1]">
      <audio
        ref={audioRef}
        className="w-full h-full w-[1px] h-[1px]"
        crossOrigin="anonymous" // Add this line for cross-origin requests
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        onEnded={() => setPaused(false)}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime === e.currentTarget.duration) {
            // Handle repeating behavior
            if (repeat === 0 && queue.length > 0) playNextSong();
            if (repeat === 1 && queue.length === 0) playNextSong();
            if (repeat === 2) {
              replaySong();
              e.currentTarget.currentTime = 0;
              e.currentTarget.play();
            } else {
              setObjectUrl(null);
            }

            if (repeat === 0 && queue.length === 0) return;

            setReload(true);
            setPaused(false);
          }
        }}
      />
    </div>
  );
}
