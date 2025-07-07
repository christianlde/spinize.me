export default function SongCardSkeleton() {
  return (
    <div className="snap-start relative aspect-square rounded-lg overflow-hidden shadow-lg border border-zinc-700 bg-500 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-full bg-500" />

      {/* Star corner (optional, for visual consistency) */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[1.5rem] md:border-t-[4rem] border-r-[2rem] lg:border-r-[6rem] border-t-500 border-r-transparent" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-between p-2 text-white">
        <div className="flex flex-row justify-start items-center">
          <div className="h-4 w-10 bg-500 rounded-md" />
        </div>

        <div className="text-left space-y-1">
          <div className="h-4 bg-500 rounded w-3/4" />
          <div className="h-3 bg-500 rounded w-1/2" />
          <div className="h-3 bg-500 rounded w-2/3" />
        </div>
      </div>

      {/* Add to queue button placeholder */}
      <div className="absolute top-9 left-2 w-6 h-6 bg-500 rounded-full" />
    </div>
  );
}
