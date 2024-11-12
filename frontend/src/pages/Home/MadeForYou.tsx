import TrendingAnMadeForYou from "@/components/skeletons/TrendingAnMadeForYou";
import { RootState } from "@/main";
import { setMadeForYouSongs } from "@/redux/slice/Music/Music";
import { madeForYouSong } from "@/services/operations/Music/Music";
import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MadeForYou = () => {
  const [madeForYouLoading, setMadeForYouLoading] = useState<boolean>(false);
  const { madeForYouSongs } = useSelector((state: RootState) => state.music);
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const fetchMadeForYou = async (): Promise<void> => {
    const token = await getToken();
    try {
      setMadeForYouLoading(true);
      const res = await madeForYouSong(token);
      dispatch(setMadeForYouSongs(res));
    } catch (error) {
      console.log(error);
    } finally {
      setMadeForYouLoading(false);
    }
  };

  useEffect(() => {
    fetchMadeForYou();
  }, []);

  if(madeForYouLoading){
    return <TrendingAnMadeForYou/>
  }

  return (
    <div className="flex flex-col gap-4 p-6 min-h-[25%]">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-gray-50 font-bold text-3xl">Made For You</h1>
        <div className="text-gray-500 cursor-pointer hover:text-gray-300 text-sm transition-all duration-100 hover:underline">
          See all
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6bg-gray-800 bg-opacity-80 ">
        {madeForYouSongs?.map((song) => (
          <div
            key={song._id}
            className="flex flex-col gap-1 items-center p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer transform hover:opacity-90"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-32 h-32 rounded-md mb-4 shadow-md"
            />
            <h3 className="text-gray-50 font-semibold text-lg text-center">
              {song.title}
            </h3>
            <p className="text-gray-400 text-sm text-center">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MadeForYou;
