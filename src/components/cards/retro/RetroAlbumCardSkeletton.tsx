export default function RetroAlbumCardSkeletton() {
  return (
    <div className="relative aspect-[11/10] rounded-l-sm rounded-r-lg overflow-hidden shadow-lg border-4 border-500 group">
      <div className="block w-full h-full flex flex-row justify-between items-center">
        <div className='w-[10%] h-full bg-black'></div>

        <div className='relative w-full h-full overflow-hidden'>
            {/* Image */}
            <div className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end gap-1 p-2">
            <h3 className="w-39 h-4 bg-500 animate-pulse"></h3>
            <p className="w-27 h-2 bg-500 animate-pulse"></p>
            <p className="w-21 h-2 bg-500 animate-pulse"></p>
            </div>
        </div>
      </div>
    </div>
  );
};
