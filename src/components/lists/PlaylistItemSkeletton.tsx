export default function PlaylistItemSkeleton() {
  return (
    <li className="w-full max-w-[100vw] flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Skeleton cover image */}
        <div className="w-12 h-12 rounded-lg bg-zinc-800 animate-pulse" />

        {/* Skeleton text */}
        <div className="py-1 w-50 sm:w-96 md:w-96 lg:w-150 h-full flex flex-col gap-2 justify-start items-start">
          <div className="w-40 h-4 bg-zinc-800 rounded animate-pulse" />
          <div className="w-24 h-3 bg-zinc-700 rounded animate-pulse" />
        </div>
      </div>
    </li>
  );
}
