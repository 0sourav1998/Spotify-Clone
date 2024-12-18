import { RootState } from "@/main";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsContent from "./components/SongsContent";
import AlbumContent from "./components/AlbumContent";
import { setAlbumLoading, setAllAlbums, setAllSongs, setSongLoading, setStats } from "@/redux/slice/Admin/Admin";
import {
  fetchAllAlbums,
  fetchAllSongs,
} from "@/services/operations/Music/Music";
import { fetchStats } from "@/services/operations/Stats/Stat";
import { useAuth } from "@clerk/clerk-react";
import StatGrid from "./components/StatGrid";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const { isUserAdmin } = useSelector((state: RootState) => state.user);
  if (!isUserAdmin) return <p>UnAuthorized</p>;

  const fetchSongs = async () => {
    try {
      dispatch(setSongLoading(true))
      const token = await getToken();
      const result = await fetchAllSongs(token as string);
      if (result) {
        dispatch(setAllSongs(result));
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setSongLoading(false))
    }
  };

  const fetchStatsFunction = async () => {
    try {
      const token = await getToken();
      const result = await fetchStats(token as string);
      const { songCount, albumCount, uniqueArtistCount, userCount } = result;
      const stats = { songCount, albumCount, uniqueArtistCount, userCount };
      dispatch(setStats(stats));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAlbums = async () => {
    try {
      dispatch(setAlbumLoading(true))
      const albums = await fetchAllAlbums();
       dispatch(setAllAlbums(albums));
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setAlbumLoading(false))
    }
  };

  useEffect(() => {
    
    fetchSongs();
    fetchAlbums();
    fetchStatsFunction();
  }, []);
  return (
    <div className="bg-black min-h-screen text-gray-50 pb-6">
      <div className="max-w-7xl mx-auto pt-6">
        <Header />
        <StatGrid />
        <Tabs defaultValue="songs">
          <TabsList className="border border-zinc-800/80 rounded-md p-1">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-zinc-800"
            >
              <Music className="size-4 mr-2" />
              Songs
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-zinc-700"
            >
              <Album className="size-4 mr-2" />
              Albums
            </TabsTrigger>
          </TabsList>
          <TabsContent value="songs">
            <SongsContent />
          </TabsContent>
          <TabsContent value="albums">
            <AlbumContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
