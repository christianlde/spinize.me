import { useContext } from "react";
import { SongPlayerContext } from "./SongPlayerContext";

export const useSongPlayer = () => {
  const context = useContext(SongPlayerContext);
  if (!context) {
    throw new Error('useSongPlayer must be used within a SongPlayerProvider');
  }
  return context;
};
