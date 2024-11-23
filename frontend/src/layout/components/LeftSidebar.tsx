import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setAlbums } from "@/redux/slice/Music/Music";
import { fetchAllAlbums } from "@/services/operations/Music/Music";
import { SignedIn } from "@clerk/clerk-react";
import { Album, HomeIcon, Library, MessageCircle, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setSwitchToChat } from "@/redux/slice/chat/chat";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state: RootState) => state.music);
  const { switchToChat } = useSelector((state: RootState) => state.chat);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const isLoading = false;

  const fetchAlbums = async () => {
    const albums = await fetchAllAlbums();
    dispatch(setAlbums(albums));
  };

  const handleSwitchToChat = () => {
    dispatch(setSwitchToChat(true));
  };

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div
      className={`h-full ${
        switchToChat ? "hidden" : "flex"
      } md:flex flex-col gap-2 text-white`}
    >
      <div className="bg-zinc-800 rounded-md xl:p-4 p-2 xl:gap-4 gap-2 flex flex-col">
        <Link
          to={"/"}
          className="flex flex-row w-full gap-2 hover:bg-zinc-900 transition-colors duration-300 p-2 rounded-md justify-center md:justify-normal"
        >
          <HomeIcon />
          <p className="hidden md:flex">Home</p>
        </Link>
        <SignedIn>
          <Link
            to={"/"}
            className="flex flex-row w-full gap-2 hover:bg-zinc-900 transition-colors p-2 duration-300 rounded-md justify-center md:justify-normal"
          >
            <MessageCircle />
            <p className="hidden md:flex">Message</p>
          </Link>
        </SignedIn>
        <div className="flex lg:hidden justify-center p-1 w-full bg-green-800 rounded-md">
          <Button
            onClick={handleSwitchToChat}
            className="transition-all duration-300 text-gray-100 text-center"
            variant={"ghost"}
          >
            <span className="text-[8px]">Switch to Chat Mode</span>
          </Button>
        </div>
      </div>

      <div className="max-h-[70%] bg-zinc-800 rounded-md md:p-4 p-2 gap-2 flex flex-col">
        <div className="flex flex-row justify-between items-center border-b border-b-slate-600 p-2">
          <div className="flex gap-2 items-center">
            <Library className="size-5 mx-auto sm:mx-0" />
            <p className="font-bold hidden sm:flex">Playlists</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer hover:bg-gray-800 transition-all duration-300 rounded-md p-2 shadow-md hover:shadow-lg">
                <Plus className="text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 text-gray-50 rounded-lg shadow-lg p-6 md:w-1/2 w-full">
              <DialogHeader className="text-lg font-semibold mb-2">
                Create Your Playlist
              </DialogHeader>
              <DialogDescription className="text-sm text-gray-400 mb-4">
                Add a custom playlist to organize your favorite songs.
              </DialogDescription>
              <div className="flex flex-col gap-6">
                <input type="file" ref={imageRef} className="hidden" />
                <div className="bg-gray-800 border border-dashed border-gray-600 p-6 flex flex-col justify-center items-center w-full rounded-lg transition-all duration-300 hover:bg-gray-700">
                  <Button
                    className="bg-blue-600 text-white w-fit px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-all"
                    onClick={() => imageRef.current?.click()}
                  >
                    Choose A File
                  </Button>
                </div>
                <input
                  className="p-3 w-full rounded-md bg-gray-800 border border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 outline-none text-gray-200 placeholder:text-gray-400 shadow-sm"
                  placeholder="Enter Playlist Title"
                />
              </div>
              <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md shadow-lg hover:shadow-xl transition-all text-center">
                Add Playlist
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : albums?.length === 0 ? (
              <p className="text-gray-400 flex gap-4 items-center justify-center h-full w-full">
                <Album />
                No Albums Found
              </p>
            ) : (
              albums?.map((album) => (
                <Link to={`/album/${album._id}`} key={album._id}>
                  <motion.div
                    className="flex xl:flex-row flex-col mb-3 xl:gap-3 gap-1.5 items-center md:shadow-md hover:bg-zinc-900 rounded-md xl:p-4 p-1 transition-all duration-200"
                    initial={{ x: -50, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={album?.imageUrl}
                      className="xl:size-16 size-full rounded-md object-cover aspect-square xl:object-cover xl:aspect-auto"
                    />
                    <div className="hidden md:flex flex-col xl:gap-2 gap-1">
                      <p className="font-normal xl:font-bold">
                        {album?.title.length > 15
                          ? album.title.substring(0, 15) + "..."
                          : album.title}
                      </p>
                      <p className="xl:font-semibold font-light text-gray-400">
                        Artist:{" "}
                        {album?.artist.length > 10
                          ? album.artist.substring(0, 10) + "..."
                          : album.artist}
                      </p>
                    </div>
                  </motion.div>
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
