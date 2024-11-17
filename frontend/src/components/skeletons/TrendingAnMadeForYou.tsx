const TrendingAnMadeForYou = () => {
  return (
    <div className="grid grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center lg:justify-start gap-3 p-3 rounded-lg animate-pulse"
        >
          <div className="h-12 w-12 rounded-md bg-zinc-800" />
          <div className="flex-1 lg:block hidden">
            <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
            <div className="h-3 w-32 bg-zinc-800 rounded" />
          </div>
        </div>
      ))}
      ;
    </div>
  );
};
export default TrendingAnMadeForYou;