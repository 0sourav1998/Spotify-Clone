import { ScrollArea } from "@/components/ui/scroll-area";
import { setSingleAlbum } from "@/redux/slice/Music/Music";
import { fetchSingleAlbum } from "@/services/operations/Music/Music";
import { RootState } from "@/main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  BookmarkPlusIcon,
  Clock,
  Loader,
  Pause,
  Play,
} from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { playAlbum, togglePlay } from "@/redux/slice/Music/PlayerStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addOrRemoveSong } from "@/services/operations/Playlist/Playlist";
import { useAuth } from "@clerk/clerk-react";

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [playlistId, setPlaylistId] = useState("");
  const [fetchAlbumLoading,setFetchAlbumLoading] = useState(false)
  const [openDialogForSong, setOpenDialogForSong] = useState<string | null>(
    null
  );
  const handleOpenDialog = (songId: string) => {
    setOpenDialogForSong(songId);
  };

  const handleCloseDialog = () => {
    setOpenDialogForSong(null);
  };

  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { singleAlbum, allPlaylists } = useSelector(
    (state: RootState) => state.music
  );

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
      dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: 0 }));
    }
  };

  const handleAddPlaylist = async (id: string) => {
    try {
      setLoading(true);
      const token = await getToken();
      await addOrRemoveSong({ id, playlistId }, token as string);
      handleCloseDialog();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!singleAlbum || !singleAlbum.songs) return;
    dispatch(playAlbum({ songs: singleAlbum.songs, startIndex: index }));
  };

  const fetchAlbum = async () => {
    if (!id) return;
    try {
      setFetchAlbumLoading(true)
      const result = await fetchSingleAlbum(id);
      dispatch(setSingleAlbum(result));
    } catch (error) {
      console.log(error);
    }finally{
      setFetchAlbumLoading(false)
    }
  };

  
  useEffect(() => {
    if (id) {
      fetchAlbum();
    }
  }, [id]);
  
  if(fetchAlbumLoading){
    return <div className="w-full h-full flex items-center justify-center">
      <Loader size={32} className="text-white animate-spin"/>
    </div>
  }


  return (
    <ScrollArea className="h-full">
      <div className="h-full rounded-md">
        <div className="absolute min-h-screen inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center md:gap-6 gap-4 md:p-6 p-5 md:pb-8 pb-2">
            <img
              src={singleAlbum?.imageUrl}
              alt={singleAlbum?.title}
              className="sm:h-60 sm:w-60 h-40 w-full rounded-md"
            />
            <div className="flex flex-col justify-end">
              <p className="text-gray-200">Album</p>
              <h1 className="text-2xl sm:text-2xl md:text-5xl font-semibold xl:text-7xl md:font-bold text-gray-200">
                {singleAlbum?.title}
              </h1>
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
              className="size-14 bg-blue-500 hover:bg-blue-700 transition-all duration-300 ml-6 rounded-full hover:scale-110"
            >
              {isPlaying &&
              singleAlbum?.songs &&
              singleAlbum?.songs.some(
                (song) => song._id === currentSong?._id
              ) ? (
                <Pause className="h-7 w-7 text-zinc-50" />
              ) : (
                <Play className="h-7 w-7 text-zinc-50" />
              )}
            </Button>
          </div>
          <div className="bg-gradient-to-t from-zinc-800 to-zinc-950 shadow-md">
            <div className="grid md:grid-cols-[10%_30%_30%_20%_10%] grid-cols-[5%_40%_30%_15%] mt-5 p-4 gap-2 border-white/5 font-bold">
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
            <ScrollArea className="border border-slate-950 h-[178px] sm:h-[210px] md:[178px] overflow-auto md:mb-24">
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
                        <Dialog
                          open={openDialogForSong === song._id}
                          onOpenChange={(isOpen) =>
                            isOpen
                              ? handleOpenDialog(song._id)
                              : handleCloseDialog()
                          }
                        >
                          <DialogTrigger onClick={(event) =>{event.stopPropagation(); handleOpenDialog(song._id)}}>
                            <button className="absolute w-fit md:p-2 p-1 md:-top-4 md:-left-8 right-2 -top-3 text-gray-700 hover:bg-blue-500 to-blue-950 rounded-full transition-all duration-200">
                              <BookmarkPlusIcon size={18} />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-700 text-gray-400" onClick={(event) =>event.stopPropagation()}>
                            <Select onValueChange={setPlaylistId}>
                              <SelectTrigger className="w-[180px] bg-gradient-to-l from-blue-950 to-green-900">
                                <SelectValue placeholder="Select a Playlist" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                                <SelectGroup>
                                  <SelectLabel className="text-gray-500 uppercase text-sm px-2">
                                    Playlists
                                  </SelectLabel>
                                  {allPlaylists &&
                                    allPlaylists
                                      .filter(
                                        (playlist) =>
                                          !playlist?.songs.some(
                                            (s) => s._id === song._id
                                          )
                                      )
                                      .map((playlist) => (
                                        <SelectItem
                                          key={playlist._id}
                                          value={playlist._id}
                                          className="w-full px-3 py-2 hover:bg-blue-900 hover:text-gray-300 focus:bg-blue-900 focus:text-gray-300 transition-all duration-200 cursor-pointer"
                                        >
                                          <span>{playlist.title}</span>
                                        </SelectItem>
                                      ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Button
                              onClick={() => handleAddPlaylist(song._id)}
                              className="w-full p-1 bg-gradient-to-l from-blue-950 to-green-900"
                            >
                              {loading ? (
                                <Loader className="animate-spin" />
                              ) : (
                                "Add"
                              )}
                            </Button>
                          </DialogContent>
                        </Dialog>
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
  );
};

export default Album;
