import React from 'react';

// Helper function to format duration in seconds to mm:ss or hh:mm:ss
const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  if (hours > 0) {
    // If hours are greater than 0, format as hh:mm:ss
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  } else {
    // Otherwise, format as mm:ss
    return `${padNumber(minutes)}:${padNumber(seconds)}`;
  }
};

// Helper function to pad numbers with leading zeros if necessary
const padNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

interface FormatDurationProps {
  duration: number; // Duration in seconds
}

const FormatDuration: React.FC<FormatDurationProps> = ({ duration }) => {
  return <span>{formatDuration(duration)}</span>;
};

export default FormatDuration;
