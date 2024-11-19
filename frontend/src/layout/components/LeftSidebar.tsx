import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setAlbums } from "@/redux/slice/Music/Music";
import { fetchAllAlbums } from "@/services/operations/Music/Music";
import { SignedIn } from "@clerk/clerk-react";
import { Album, HomeIcon, Library, MessageCircle } from "lucide-react";
import React, { useEffect } from "react";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state: RootState) => state.music);
  const isLoading = false;

  const fetchAlbums = async () => {
    const albums = await fetchAllAlbums();
    dispatch(setAlbums(albums));
  };
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <div className="h-full flex flex-col gap-3 text-white">
      <div className="bg-zinc-800 rounded-md p-4 gap-4 flex flex-col">
        <Link
          to={"/"}
          className="flex flex-row gap-4 hover:bg-zinc-900 transition-colors duration-300 p-2 rounded-md"
        >
          <HomeIcon />
          <p className="hidden md:flex">Home</p>
        </Link>
        <SignedIn>
          <Link
            to={"/"}
            className="flex flex-row gap-4 hover:bg-zinc-900 transition-colors duration-300 p-2 rounded-md"
          >
            <MessageCircle />
            <p className="hidden md:flex">Message</p>
          </Link>
        </SignedIn>
      </div>
      <div className="flex-1 bg-zinc-800 rounded-md p-4 gap-4 flex flex-col">
        <div className="flex gap-2 items-center">
          <Library className="size-5" />
          <p className="font-bold hidden md:flex">Playlists</p>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : albums?.length === 0 ? (
              <p className="text-gray-400 flex gap-4 items-center justify-center h-full w-full"><Album/>No Albums Found</p>
            ) : (
              albums?.map((album) => (
                <Link to={`/album/${album._id}`} key={album._id}>
                  <div className="flex gap-4 items-center shadow-md hover:bg-zinc-900 rounded-md p-4 transition-all duration-200">
                    <img src={album?.imageUrl} className="size-16 rounded-md" />
                    <div className="flex flex-col gap-2 items-center">
                      <p className="font-bold">{album?.title.length > 15 ? album.title.substring(0,15) + "..." : album.title}</p>
                      <p className="font-semibold text-gray-400">Artist : {album?.artist.length > 10 ? album.artist.substring(0,10) + "..." : album.artist}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
