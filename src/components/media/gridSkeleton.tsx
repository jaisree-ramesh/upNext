const GridSkeleton = () => {
  const count = 10;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-9 mr-2 mt-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg overflow-hidden bg-card shadow animate-pulse"
        >
          {/* Poster */}
          <div className="w-full aspect-[2/3] bg-muted" />

          {/* Text */}
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-6 w-6 bg-muted rounded" />
              <div className="h-6 w-6 bg-muted rounded" />
              <div className="h-6 w-6 bg-muted rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;
