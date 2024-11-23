import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { RootState } from "@/main";
import { setAllSongs } from "@/redux/slice/Admin/Admin";
import { deleteSongs } from "@/services/operations/Music/Music";
import { useAuth } from "@clerk/clerk-react";
import { Calendar, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SongTable = () => {
  const { songs , songLoading } = useSelector((state: RootState) => state.admin);
  const [loadingSongs, setLoadingSongs] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const deleteSong = async (id: string) => {
    try {
      setLoadingSongs((prev) => ({ ...prev, [id]: true }));
      const token = await getToken();
      if (token && id) {
        const res = await deleteSongs(id, token);
        toast.success("Song Deleted Successfully");
        const updatedResult = songs.filter((s) => s._id !== res._id);
        dispatch(setAllSongs(updatedResult));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSongs((prev) => ({ ...prev, [id]: false }));
    }
  };

  if(songLoading){
    return <div className="flex justify-center items-center">
      <Loader className="text-green-700 animate-spin"/>
    </div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><span className="text-xs md:text-sm lg:text-lg">Title</span></TableHead>
          <TableHead className="hidden sm:table-cell"><span className="text-xs md:text-sm lg:text-lg">Artist</span></TableHead>
          <TableHead className="hidden md:table-cell"><span className="text-xs md:text-sm lg:text-lg">Release Year</span></TableHead>
          <TableHead className="text-right"><span className="text-xs md:text-sm lg:text-lg">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs && songs.length !== 0 ? (
          songs.map((song) => (
            <TableRow
              key={song._id}
              className="hover:bg-zinc-800/50 cursor-pointer transition-all duration-300 items-center"
            >
              <TableCell className="flex gap-2 items-center">
                <img src={song.imageUrl} className="size-10 rounded-md" />
                <span className="text-xs md:text-sm lg:text-lg">{song.title}</span>
              </TableCell>
              <TableCell className="hidden sm:table-cell"><span className="text-xs md:text-sm lg:text-lg">{song.artist}</span></TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <div className="flex items-center gap-2">

                  <Calendar />
                  <span className="text-xs md:text-sm lg:text-lg">{song.createdAt.split("T")[0]}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => deleteSong(song._id as string)}
                  variant={"ghost"}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:scale-110 transition-all duration-300"
                  disabled={loadingSongs[song._id as string]} // Disable button if it's loading
                >
                  {loadingSongs[song._id as string] ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-8 text-red-600 text-xl mt-6"
            >
              No Songs Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SongTable;
