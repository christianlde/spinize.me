import { createContext, useContext } from "react";

type DownloadContextType = {
  downloadedIds: Set<string>;
  refreshDownloads: () => Promise<void>;
};

export const DownloadContext = createContext<DownloadContextType>({
  downloadedIds: new Set(),
  refreshDownloads: async () => {},
});

export const useDownloadContext = () => useContext(DownloadContext);