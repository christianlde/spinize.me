// hooks/DownloadContext.tsx
import { useEffect, useState, type ReactNode } from "react";
import { getSongAll } from "../lib/songDB";
import type { Song } from "../types/Song";
import { DownloadContext } from "./useDownloadContext";

export const DownloadProvider = ({ children }: { children: ReactNode }) => {
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  const refreshDownloads = async () => {
    const songs = await getSongAll();
    setDownloadedIds(new Set(songs.map((song: Song) => song.id)));
  };

  useEffect(() => {
    refreshDownloads();
  }, []);

  return (
    <DownloadContext.Provider value={{ downloadedIds, refreshDownloads }}>
      {children}
    </DownloadContext.Provider>
  );
};
