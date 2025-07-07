import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import type { Song } from '../../types/Song';
import { getSong, saveSong } from '../../lib/songDB';

type DownloadAllToggleProps = {
  list: Song[];
};

export default function DownloadAllToggle({ list }: DownloadAllToggleProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [total, setTotal] = useState(list.length);

  // Check how many are already downloaded
  useEffect(() => {
    const checkDownloads = async () => {
      const checks = await Promise.all(list.map((song) => getSong(song.id)));
      const alreadyDownloaded = checks.filter(Boolean).length;
      setDownloadedCount(alreadyDownloaded);
      setTotal(list.length);
    };

    checkDownloads();
  }, [list]);

  const handleDownloadAll = async () => {
    if (!list || list.length === 0) return;
    setDownloading(true);

    for (const [ , song] of list.entries()) {
      const alreadyDownloaded = await getSong(song.id);
      if (!alreadyDownloaded) {
        try {
          await saveSong(song);
          setDownloadedCount((prev) => prev + 1);
        } catch (err) {
          console.error(`Failed to save song ID ${song.id}`, err);
        }
      } else {
        // Already downloaded; count toward total
        setDownloadedCount((prev) => prev + 0); // No increment
      }
    }

    setDownloading(false);
  };

  const allDownloaded = downloadedCount === total;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleDownloadAll}
        disabled={downloading || allDownloaded}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
      >
        <FontAwesomeIcon icon={allDownloaded ? faCircleCheck : faCloudArrowDown} />
        {downloading
          ? `Downloading ${downloadedCount} / ${total}`
          : allDownloaded
          ? 'All Downloaded'
          : 'Download All'}
      </button>

      {/* Optional: Progress bar */}
      {downloading && (
        <div className="w-full h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${(downloadedCount / total) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
