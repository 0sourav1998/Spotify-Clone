import { ScrollArea } from "@/components/ui/scroll-area";
import { setSingleAlbum } from "@/redux/slice/Music/Music";
import { fetchSingleAlbum } from "@/services/operations/Music/Music";
import { RootState } from "@/main";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { playAlbum, togglePlay } from "@/redux/slice/Music/PlayerStore";

const Album = () => {
  const { id } = useParams<{id : string}>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<Boolean>(false);
  const { singleAlbum } = useSelector((state: RootState) => state.music);
  const { currentSong, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const handlePlayAlbum = () => {
    if (!singleAlbum || !singleAlbum.songs) return;

    const isCurrentAlbumPlaying = singleAlbum?.songs?.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) dispatch(togglePlay());
    else {
      // start playing the album from the beginning
      dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: 0 }));
    }
  };

  const handlePlaySong = (index: number) => {
    if (!singleAlbum || !singleAlbum.songs) return;
    dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: index }));
  };

  const fetchAlbum = async () => {
    if(!id) return ;
    try {
      setLoading(true);
      const result = await fetchSingleAlbum(id);
      dispatch(setSingleAlbum(result));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      fetchAlbum();
    }
  }, [id]);
  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="absolute min-h-screen inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900" />
        <div className="relative z-10">
          <div className="flex gap-6 p-6 pb-8">
            <img src={singleAlbum?.imageUrl} className="h-60 w-60 rounded-md" />
            <div className="flex flex-col justify-end">
              <p className="text-gray-200">Album</p>
              <h1 className="text-7xl text-gray-200">{singleAlbum?.title}</h1>
              <div className="flex flex-row gap-4 text-gray-200 font-medium text-sm mt-4">
                <span>{singleAlbum?.artist}</span>
                <span> • {singleAlbum?.songs?.length} Songs</span>
                <span> • {singleAlbum?.releaseYear}</span>
              </div>
            </div>
          </div>
          <div>
            <Button
              onClick={handlePlayAlbum}
              className="size-14 bg-green-400 hover:bg-green-500 transition-all duration-300 ml-6 rounded-full hover:scale-110"
            >
              {isPlaying && singleAlbum?.songs &&
              singleAlbum?.songs.some(
                (song) => song._id === currentSong?._id
              ) ? (
                <Pause className="h-7 w-7 text-zinc-950" />
              ) : (
                <Play className="h-7 w-7 text-zinc-950" />
              )}
            </Button>
          </div>
          <div className="bg-black/20 backdrop-blur-sm">
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] mt-5 p-4 border-white/5">
              <div className="text-zinc-400 pr-4">#</div>
              <div className="text-zinc-400">Title</div>
              <div className="text-zinc-400">Release date</div>
              <div className="text-zinc-400">
                <Clock className="size-4" />
              </div>
            </div>
            <div className="">
              <div className="space-y-2">
                {singleAlbum?.songs?.length === 0 ? (
                  <p className="text-gray-200 text-xl w-full p-3">
                    No Songs Found in this Album
                  </p>
                ) : (
                  singleAlbum?.songs?.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        onClick={() => handlePlaySong(index)}
                        key={song._id}
                        className="w-full grid grid-cols-[16px_4fr_2fr_1fr] gap-4 text-sm group text-zinc-400 hover:bg-white/5 rounded-sm cursor-pointer p-4 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center">
                          <span className="group-hover:hidden">
                            {isCurrentSong && isPlaying ? (
                              <div className="size-4 text-green-500">♫</div>
                            ) : (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                          </span>
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            className="size-10 rounded-md"
                            alt={song.title}
                          />
                          <div>
                            <span>{song.title}</span>
                            <span>{song.artist}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDate(song.duration)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Album;
