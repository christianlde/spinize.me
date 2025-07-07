export default function ArtistCardSkeletton() {
  return (
    <div className="snap-start relative w-full h-full rounded-full overflow-hidden shadow-lg border-1 border-color-500 bg-500 animate-pulse">
      {/* Top Right Playing Icon Placeholder */}
      <div className="absolute top-2 right-2 w-[2rem] h-[2rem] bg-black/75 rounded-lg" />

      {/* Top Left Star Ribbon Placeholder */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[1rem] md:border-t-[3rem] border-r-[1.5rem] lg:border-r-[4rem] border-t-color-golden border-r-transparent opacity-30" />

      {/* Image Placeholder (entire card is already the bg-500 pulsing) */}
      <div className="w-full h-full bg-600 w-[184px] h-[184px]" />

      {/* Gradient Overlay with Artist Name Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center text-white p-2">
        <div className="h-4 w-2/3 bg-600 rounded" />
      </div>
    </div>
  );
}
