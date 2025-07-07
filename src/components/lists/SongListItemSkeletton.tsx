export default function SongListItemSkeletton() {
  return (
    <li className="w-full max-w-[100vw] flex items-center justify-between py-2 border-b last:border-none animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Placeholder for song number or button */}
        <span className="text-sm text-500 hidden md:block w-5 h-4 bg-zinc-700 rounded" />

        {/* Cover image placeholder */}
        <div className="w-[72px] h-[72px] min-w-[72px] bg-zinc-700 rounded-lg" />

        {/* Song text details placeholders */}
        <div className="py-1 w-50 sm:w-96 md:w-96 lg:w-150 h-full flex flex-col gap-1">
          <div className="w-32 h-4 bg-zinc-600 rounded" />
          <div className="w-24 h-3 bg-zinc-600 rounded" />
          <div className="w-40 h-3 bg-zinc-600 rounded" />
        </div>
      </div>

      {/* Action icons and duration placeholders */}
      <div className="hidden md:flex flex-row gap-32 justify-between items-center">
        {/* Duration */}
        <div className="hidden xl:block w-10 h-3 bg-zinc-600 rounded" />

        {/* Actions */}
        <div className="flex flex-row gap-4">
          <div className="w-5 h-5 bg-zinc-600 rounded" />
          <div className="w-16 h-4 bg-zinc-600 rounded" />
          <div className="w-5 h-5 bg-zinc-600 rounded" />
          <div className="w-5 h-5 bg-zinc-600 rounded" />
        </div>
      </div>
    </li>
  );
}
