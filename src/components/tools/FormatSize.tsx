import React from 'react';

// Format size in bytes to MB,KB (e.g., "29,311 MB")
const formatSize = (size: number): string => {
  const KB = 1024;
  const MB = KB * 1024;

  const totalMB = Math.floor(size / MB);
  const remainingKB = Math.floor((size % MB) / KB);

  return `${totalMB},${remainingKB} MB`;
};

interface Props {
  size: number; // Size in bytes
}

const FormatSize: React.FC<Props> = ({ size }) => {
  return <span>{formatSize(size)}</span>;
};

export default FormatSize;
