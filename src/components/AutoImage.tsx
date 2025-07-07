interface AutoImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  type: 'song' | 'album' | 'artist' | 'playlist' | 'radio';
}

export default function AutoImage({
  src,
  alt,
  className,
  width = 256,
  height = 256,
  loading = 'eager',
  type = 'song',
}: AutoImageProps) {
  // Ensure the correct path for assets under /app
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={(e) => {
        e.currentTarget.src =
          type === 'album'
            ? '/albumCover.jpg'
            : type === 'artist'
            ? '/artistCover.jpg'
            : type === 'playlist'
            ? '/playlistCover.jpg'
            : type === 'radio'
            ? '/radioCover.jpg'
            : '/songCover.jpg';
      }}
    />
  );
}
