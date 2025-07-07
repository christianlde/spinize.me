import { createContext } from "react";
import type { SongPlayerContextProps } from "./SongPlayerProvider";

export const SongPlayerContext = createContext<SongPlayerContextProps | undefined>(undefined);