import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { RootState } from "@/main";
import { setFeaturedSongs } from "@/redux/slice/Music/Music";
import { fetchFeaturedSongs } from "@/services/operations/Music/Music";
import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayerFeatured from "./Controller/AudioPlayerHomePage";

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
    <div className="flex flex-col gap-6 px-6 py-4 min-h-[30%]">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-50">
            Good Afternoon
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here are some tunes to get you going
          </p>
        </div>
        <div className="text-gray-500 cursor-pointer hover:text-gray-300 text-sm transition-all duration-100 hover:underline">See all</div>
      </div>

      <div className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
        {featuredSongs?.map((song) => (
          <div
            key={song._id}
            className="flex group items-center gap-4 p-4 bg-gray-800 bg-opacity-60 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-opacity-80 shadow-lg"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-16 h-16 rounded-md shadow-md"
            />
            <div className="flex flex-col text-gray-50">
              <span className="font-semibold text-lg truncate">
                {song.title}
              </span>
              <span className="font-medium text-sm text-gray-400 truncate">
                {song.artist}
              </span>
            </div>
            <AudioPlayerFeatured song={song}/> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSongs;
