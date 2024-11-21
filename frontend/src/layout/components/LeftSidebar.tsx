import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setAlbums } from "@/redux/slice/Music/Music";
import { fetchAllAlbums } from "@/services/operations/Music/Music";
import { SignedIn } from "@clerk/clerk-react";
import { Album, HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
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
      <div className="bg-zinc-800 rounded-md p-4 gap-4 flex flex-col items-center">
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
      <div className="flex-1 bg-zinc-800 rounded-md md:p-4 md:gap-4 p-2 gap-2 flex flex-col">
        <div className="flex gap-2 items-center  borer border-b p-1">
          <Library className="size-5 mx-auto sm:mx-0" />
          <p className="font-bold hidden sm:flex">Playlists</p>
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
                  <div className="flex md:flex-row flex-col mb-3 md:gap-4 gap-1.5 items-center md:shadow-md hover:bg-zinc-900 rounded-md md:p-4 p-1 transition-all duration-200">
                    <img src={album?.imageUrl} className="md:size-16 size-full rounded-md object-cover aspect-square md:object-none md:aspect-auto" />
                    <div className=" hidden md:flex flex-col gap-2 items-center">
                      <p className="md:font-bold font-normal">{album?.title.length > 15 ? album.title.substring(0,15) + "..." : album.title}</p>
                      <p className="md:font-semibold font-light text-gray-400">Artist : {album?.artist.length > 10 ? album.artist.substring(0,10) + "..." : album.artist}</p>
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
