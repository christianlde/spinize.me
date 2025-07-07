export default function RadioCardSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-800 p-4 shadow animate-pulse flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-zinc-700 rounded" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-zinc-700 rounded" />
          <div className="w-20 h-3 bg-zinc-600 rounded" />
        </div>
      </div>
      <div className="w-24 h-6 bg-zinc-700 rounded" />
    </div>
  );
}
