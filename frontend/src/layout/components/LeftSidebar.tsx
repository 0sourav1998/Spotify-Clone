import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setAlbums, setAllPlaylists } from "@/redux/slice/Music/Music";
import { fetchAllAlbums } from "@/services/operations/Music/Music";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import {
  Album,
  ArrowBigDown,
  ArrowDown,
  HomeIcon,
  Library,
  MessageCircle,
  Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setSwitchToChat } from "@/redux/slice/chat/chat";
import { motion } from "framer-motion";
import AddPlaylist from "./AddPlaylist";
import { allPlayLists } from "@/services/operations/Playlist/Playlist";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { albums, allPlaylists } = useSelector(
    (state: RootState) => state.music
  );
  const { switchToChat } = useSelector((state: RootState) => state.chat);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const isLoading = false;
  const { getToken } = useAuth();

  const fetchAlbums = async () => {
    const albums = await fetchAllAlbums();
    dispatch(setAlbums(albums));
  };

  const fetchPlaylists = async () => {
    const token = await getToken();
    const playlists = await allPlayLists(token as string);
    dispatch(setAllPlaylists(playlists));
  };

  const handleSwitchToChat = () => {
    dispatch(setSwitchToChat(true));
  };

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    fetchPlaylists();
  }, [allPlaylists]);

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
        <div className="flex lg:hidden justify-center p-1 w-full">
          <label className="relative flex items-center cursor-pointer gap-2">
            <input
              type="checkbox"
              checked={!switchToChat}
              onChange={() => dispatch(setSwitchToChat(!switchToChat))}
              className="sr-only peer"
            />
            <div className="w-4 h-4 bg-green-900 peer-focus:outline-none peer-focus:ring-2 rounded-full"></div>
            <span className="text-xs font-medium text-gray-300">
              {switchToChat ? "Normal" : "Chat"}
            </span>
          </label>
        </div>
      </div>

      <div className="max-h-[70%] bg-zinc-800 rounded-md md:p-4 p-2 gap-2 flex flex-col">
        <div className="flex flex-row justify-between items-center border-b border-b-slate-600 p-2">
          <div className="flex gap-2 items-center">
            <Library className="size-5 mx-auto sm:mx-0" />
            <p className="font-bold hidden sm:flex">Playlists</p>
          </div>
          <AddPlaylist />
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <ScrollArea className="cursor-pointer rounded-md shadow-md p-1 mb-2 bg-gradient-to-r from-blue-950 to-green-900 transition-all duration-300 max-h-72">
            <div
              className="flex justify-between items-center rounded-md hover:bg-gray-800 transition-all duration-200"
              onClick={() => setOpenPlaylist((prev) => !prev)}
            >
              <p className="text-left text-gray-200 md:text-sm text-xs font-semibold md:p-2 p-1">
                My Playlists
              </p>
              <ArrowDown
                className={`transition-transform ${
                  openPlaylist ? "rotate-180" : "rotate-0"
                } hidden md:flex`}
              />
            </div>

            <div
              className={`${
                openPlaylist ? "flex flex-col gap-2" : "hidden"
              } w-[90%] mx-auto mt-3 mb-3`}
            >
              {allPlaylists?.length !== 0 ? (
                allPlaylists?.map((playlist) => (
                  <div
                  onClick={()=>navigate(`/playlist/${playlist._id}`)}
                    key={playlist._id}
                    className="flex items-center gap-4 bg-blue-950 shadow-md shadow-blue-800 p-2 rounded-md hover:shadow-md hover:bg-gray-950 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gray-600 rounded-full  hidden md:flex justify-center items-center text-gray-400">
                      <img
                        src={playlist.imageUrl || "/placeholder.png"}
                        alt="Playlist"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-gray-200 text-sm font-medium truncate">
                      {playlist.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No Playlist Found</p>
              )}
            </div>
          </ScrollArea>

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
