import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { RootState } from "@/main";
import { setFeaturedSongs } from "@/redux/slice/Music/Music";
import { fetchFeaturedSongs } from "@/services/operations/Music/Music";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayerFeatured from "./Controller/AudioPlayerHomePage";
import { motion } from "framer-motion";

const FeaturedSongs = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { featuredSongs } = useSelector((state: RootState) => state.music);

  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const fetchFeatured = async (): Promise<void> => {
    const token = await getToken();
    try {
      setFetchLoading(true);
      const res = await fetchFeaturedSongs(token);
      dispatch(setFeaturedSongs(res));
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, [user]);

  if (fetchLoading) {
    return <FeaturedGridSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8 xl:px-6 px-3 lg:py-6 py-3 bg-gradient-to-b from-gray-900 to-black  text-gray-50">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="md:font-extrabold font-bold md:text-4xl text-2xl text-gray-100">
            Good Afternoon
          </h1>
          <p className="text-gray-400 md:text-sm text-xs mt-1 hidden sm:flex">
            Here are some tunes to get you going
          </p>
        </div>
        <div className="text-gray-500 cursor-pointer hover:text-gray-300 md:text-sm text-xs transition-all duration-100 hover:underline">
          See all
        </div>
      </div>

      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 xl:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {featuredSongs?.map((song) => (
          <motion.div
            key={song._id}
            className="relative cursor-pointer flex flex-col sm:flex-row group items-center md:gap-3 xl:gap-2 gap-4 xl:p-3 p-2 bg-gray-800 bg-opacity-70 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-opacity-90 shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="sm:w-16 sm:h-16 lg:size-12 xl:size-16 size-full aspect-square object-cover rounded-lg shadow-md p-4 sm:p-0"
            />
            
            <div className="hidden sm:flex flex-col text-gray-50">
              <span className="font-semibold text-xs xl:text-sm  truncate">
                {song.title.length > 10
                  ? song.title.substring(0, 10) + "..."
                  : song.title}
              </span>
              <span className="font-medium text-xs text-gray-400 truncate">
                {song.artist.length > 15
                  ? song.artist.substring(0, 15) + "..."
                  : song.artist}
              </span>
            </div>
            
            <motion.div
              className="absolute left-6 top-6 flex sm:hidden flex-col bg-slate-800 bg-opacity-80  gap-2 font-bold opacity-0 p-4 group-hover:opacity-100 transition-all duration-300"
             
            >
              <span className="text-gray-100 text-sm">
                Title : {song.title.length > 10
                  ? song.title.substring(0, 10) + "..."
                  : song.title}
              </span>
              <span className="text-gray-200 text-xs">
                Artist : {song.artist.length > 15
                  ? song.artist.substring(0, 15) + "..."
                  : song.artist}
              </span>
            </motion.div>
            

            <AudioPlayerFeatured song={song} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedSongs;
