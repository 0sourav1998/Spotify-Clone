import TrendingAnMadeForYou from "@/components/skeletons/TrendingAnMadeForYou";
import { RootState } from "@/main";
import { setTrendingSongs } from "@/redux/slice/Music/Music";
import { fetchTrendingSongs } from "@/services/operations/Music/Music";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayerHomePage from "./Controller/AudioPlayerHomePage";
import { motion } from "framer-motion";

const TrendingSongs = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const [trendingLoading, setTrendingLoading] = useState<boolean>(false);
  const { trendingSongs } = useSelector((state: RootState) => state.music);

  const fetchTrending = async (): Promise<void> => {
    const token = await getToken();
    try {
      setTrendingLoading(true);
      const res = await fetchTrendingSongs(token);
      dispatch(setTrendingSongs(res));
    } catch (error) {
      console.log(error);
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  if (trendingLoading) {
    return <TrendingAnMadeForYou />;
  }
  return (
    <div className="flex flex-col gap-4 p-6 md:min-h-[25%]">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-gray-50 font-bold md:text-3xl text-xl">Trending</h1>
        <div className="text-gray-500 cursor-pointer hover:text-gray-300 text-sm transition-all duration-100 hover:underline">
          See all
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ x: -50, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{
          x: { type: "spring", stiffness: 120, damping: 15 },
          opacity: { duration: 0.3, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {trendingSongs?.map((song) => (
          <div
            key={song._id}
            className="relative group flex flex-col gap-1 items-center p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer transform hover:opacity-90"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-32 h-32 rounded-md mb-4 shadow-md"
            />
            <h3 className="text-gray-50 font-semibold text-lg text-center">
              {song.title.length > 10
                ? song.title.substring(0, 10) + "..."
                : song.title}
            </h3>
            <p className="text-gray-400 text-sm text-center">{song.artist}</p>
            <AudioPlayerHomePage song={song} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrendingSongs;
