export default function SongBrickItemSkeletton() {
  return (
    <div className="snap-start w-full flex items-center justify-between border-b last:border-none bg-500 animate-pulse rounded-md overflow-hidden pr-2">
      <div className="flex items-center gap-4">
        {/* Image placeholder */}
        <div className="relative w-[72px] h-[72px] min-w-[72px] bg-zinc-700 rounded-md" />

        {/* Text placeholders */}
        <div className="py-1 flex flex-col justify-start items-start w-fit max-w-[calc(100%-80px)] gap-1">
          <div className="h-4 w-3/4 bg-zinc-600 rounded" />
          <div className="h-3 w-2/3 bg-zinc-600 rounded" />
          <div className="h-3 w-1/2 bg-zinc-600 rounded" />
        </div>
      </div>
    </div>
  );
}
