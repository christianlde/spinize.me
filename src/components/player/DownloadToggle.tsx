import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { Song } from "../../types/Song";
import { saveSong, deleteSong } from "../../lib/songDB";
import { useDownloadContext } from "../../hooks/useDownloadContext";

interface Props {
  song: Song;
  className?: string;
}

export default function DownloadToggle({ song, className = "" }: Props) {
  const { downloadedIds, refreshDownloads } = useDownloadContext();
  const [loading, setLoading] = useState(false);

  const downloaded = downloadedIds.has(song.id);

  const toggleDownload = async () => {
    setLoading(true);
    if (downloaded) {
      await deleteSong(song.id);
    } else {
      await saveSong(song);
    }

    await refreshDownloads(); // This updates all components using the context
    setLoading(false);
  };

  return (
    <button onClick={toggleDownload} disabled={loading} className={className}>
      <FontAwesomeIcon icon={downloaded ? faCircleCheck : faCloudArrowDown} />
    </button>
  );
}
