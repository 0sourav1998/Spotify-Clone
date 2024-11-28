import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/formatDate";
import { RootState } from "@/main";
import { setSinglePlaylist } from "@/redux/slice/Music/Music";
import { playAlbum, togglePlay } from "@/redux/slice/Music/PlayerStore";
import {
  addOrRemoveSong,
  fetchSinglePlaylist,
} from "@/services/operations/Playlist/Playlist";
import { useAuth } from "@clerk/clerk-react";
import {
  BarChart2,
  BookmarkMinus,
  Clock,
  Loader,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Playlist = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { singlePlaylist, singleAlbum } = useSelector(
    (state: RootState) => state.music
  );
  const { currentSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const handlePlaySong = (index: number) => {
    if (!singleAlbum || !singleAlbum.songs) return;
    dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: index }));
  };

  const fetchSingle = async () => {
    try {
      const token = await getToken();
      setLoading(true);
      if (id && token) {
        console.log("here");
        const res = await fetchSinglePlaylist(id, token);
        dispatch(setSinglePlaylist(res));
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAlbum = () => {
    if (!singleAlbum || !singleAlbum.songs) return;
    const isCurrentAlbumPlaying = singleAlbum?.songs?.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) dispatch(togglePlay());
    else {
      dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: 0 }));
    }
  };

  const handleRemovePlaylist = async (songId: string) => {
    try {
      setLoading(true);
      const token = await getToken();
      await addOrRemoveSong({ id: songId, playlistId: id }, token as string);
      if (singlePlaylist && singlePlaylist.songs) {
        const updatedSongs = singlePlaylist.songs.filter(
          (song) => song._id !== songId
        );

        const updatedPlaylist = {
          ...singlePlaylist,
          songs: updatedSongs,
        };

        dispatch(setSinglePlaylist(updatedPlaylist));
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSingle();
  }, [id]);

  return (
    <div className="text-white text-2xl">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader className="size-10 text-green-950 animate-spin" />
        </div>
      ) : (
        <ScrollArea className="h-full">
          <div className="h-full rounded-md">
            <div className="absolute min-h-screen inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900" />
            <div className="relative max-h-[85vh] z-10">
              <div className="flex flex-col sm:flex-row items-center md:gap-6 gap-4 md:p-6 p-5 md:pb-8 pb-2">
                <img
                  src={singlePlaylist?.imageUrl}
                  alt={singlePlaylist?.title}
                  className="sm:h-60 sm:w-60 h-40 w-full rounded-md"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-gray-200 hidden md:flex">My Playlist</p>
                  <h1 className="text-2xl sm:text-2xl md:text-5xl font-semibold xl:text-7xl md:font-bold text-gray-200">
                    {singlePlaylist?.title}
                  </h1>
                  <div className="flex flex-row gap-4 text-gray-200 text-lg mt-4 font-semibold">
                    <span>
                      Total Songs In This Playlist -{" "}
                      {singlePlaylist?.songs?.length} Songs
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  onClick={handlePlayAlbum}
                  className="size-14 bg-blue-500 hover:bg-blue-700 transition-all duration-300 ml-6 rounded-full hover:scale-110"
                >
                  {isPlaying &&
                  singlePlaylist?.songs &&
                  singlePlaylist?.songs.some(
                    (song) => song._id === currentSong?._id
                  ) ? (
                    <Pause className="h-7 w-7 text-zinc-50" />
                  ) : (
                    <Play className="h-7 w-7 text-zinc-50" />
                  )}
                </Button>
              </div>
              <div className="bg-gradient-to-t from-zinc-800 to-zinc-950 shadow-md">
                <div className="grid md:grid-cols-[10%_30%_30%_20%_10%] grid-cols-[5%_40%_30%_15%] mt-5 p-4 gap-2 border-white/5 text-sm font-bold">
                  <div className="text-zinc-400 text-center">#</div>
                  <div className="text-zinc-400">Title</div>
                  <div className="text-zinc-400">Artist</div>
                  <div className="text-zinc-400 text-center md:flex hidden">
                    Release Date
                  </div>
                  <div className="text-zinc-400 text-center md:text-left">
                    <Clock className="size-4 inline-block" />
                  </div>
                </div>
                <ScrollArea className="border border-slate-950 h-[178px] sm:h-[210px] md:[178px] overflow-auto">
                  {singlePlaylist?.songs?.length === 0 ? (
                    <p className="text-gray-200 text-xl w-full p-3 text-center mt-4">
                      No Songs Found in this Album
                    </p>
                  ) : (
                    singlePlaylist?.songs?.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return (
                        <div
                          onClick={() => handlePlaySong(index)}
                          key={song._id}
                          className="grid md:grid-cols-[10%_30%_30%_20%_10%] grid-cols-[5%_40%_30%_15%] md:text-sm text-xs group text-zinc-400 hover:bg-white/5 rounded-sm cursor-pointer transition-all gap-2 duration-300 items-center py-3 px-1.5 sm:p-4"
                        >
                          <div className="flex items-center justify-center text-center">
                            {isCurrentSong && isPlaying ? (
                              <div>
                                <BarChart2 className="h-4 w-4 text-green-500 animate-pulse" />
                              </div>
                            ) : (
                              <span className="group-hover:hidden flex flow-row gap-2">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && (
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            )}
                          </div>
                          <div className="relative flex items-center gap-3">
                            <img
                              src={song.imageUrl}
                              className="h-10 w-10 rounded-md hidden sm:flex"
                              alt={song.title}
                            />
                            <span className="truncate">
                              {song.title.length > 10
                                ? song.title.substring(0, 10) + "..."
                                : song.title}
                            </span>
                            <button
                              onClick={(event) => {handleRemovePlaylist(song._id);event.stopPropagation()}}
                              className="absolute w-fit h-fit rounded-full md:p-2 p-1 md:-top-4 md:-left-8 right-3 bottom-0.5  text-gray-700 hover:bg-red-500 to-blue-950 transition-all duration-200"
                            >
                              <BookmarkMinus size={16}/>
                            </button>
                          </div>
                          <div className="truncate">{song.artist}</div>
                          <div className="text-center md:flex hidden">
                            {song.createdAt.split("T")[0]}
                          </div>
                          <div className="text-center md:text-left">
                            {formatDate(song.duration)}
                          </div>
                        </div>
                      );
                    })
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
