export default function PlaylistCardSkeletton() {
  return (
    <div className="snap-start relative aspect-square rounded-lg overflow-hidden shadow-lg border-1 border-color-500 bg-500 animate-pulse">
      {/* Top Right Playing Icon Placeholder */}
      <div className="absolute top-2 right-2 w-[2rem] h-[2rem] bg-black/75 rounded-lg" />

      {/* Top Left Star Ribbon Placeholder */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[1rem] md:border-t-[3rem] border-r-[1.5rem] lg:border-r-[4rem] border-t-color-golden border-r-transparent opacity-30" />

      {/* Image Placeholder */}
      <div className="w-full h-full" />

      {/* Gradient Overlay with Placeholder Text Bars */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-2 text-white space-y-1">
        <div className="h-4 w-3/4 bg-zinc-700 rounded" />
        <div className="h-3 w-1/2 bg-zinc-600 rounded" />
        <div className="h-3 w-1/3 bg-zinc-600 rounded" />
      </div>
    </div>
  );
}
