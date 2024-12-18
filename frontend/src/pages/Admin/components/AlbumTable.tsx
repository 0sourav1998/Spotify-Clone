import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/main";
import { setAllAlbums } from "@/redux/slice/Admin/Admin";
import { deleteAlbum } from "@/services/operations/Music/Music";
import { useAuth } from "@clerk/clerk-react";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AlbumTable = () => {
  const { albums } = useSelector((state: RootState) => state.admin);
  const [loadingSongs, setLoadingSongs] = useState<Record<string, boolean>>({});
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const deleteAlbumFunc = async (id: string) => {
    try {
      setLoadingSongs((prev) => ({ ...prev, [id]: true }));
      const token = await getToken();
      if (token && id) {
        const res = await deleteAlbum(id, token);
        toast.success("Album Deleted Successfully");
        const updatedResult = albums.filter((a) => a._id !== res._id);
        dispatch(setAllAlbums(updatedResult));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSongs((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><span className="text-xs md:text-sm lg:text-lg">Title</span></TableHead>
          <TableHead className="hidden sm:table-cell">
            <span className="text-xs md:text-sm lg:text-lg">Artist</span></TableHead>
          <TableHead className="hidden md:table-cell"><span className="text-xs md:text-sm lg:text-lg">Release Year</span></TableHead>
          <TableHead className="hidden md:table-cell"><span className="text-xs md:text-sm lg:text-lg">Songs</span></TableHead>
          <TableHead className="text-right"><span className="text-xs md:text-sm lg:text-lg">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums && albums.length !== 0 ? (
          albums.map((album) => (
            <TableRow key={album._id}>
              <TableCell className="flex gap-2 items-center">
                <img src={album.imageUrl} className="size-12 rounded-md" />
                <span className="text-xs md:text-sm lg:text-lg">{album.title}</span>
              </TableCell>
              <TableCell className="hidden sm:table-cell"><span className="text-xs md:text-sm lg:text-lg">{album.artist}</span></TableCell>
              <TableCell className="hidden md:table-cell"><span className="text-xs md:text-sm lg:text-lg">{album.releaseYear}</span></TableCell>
              <TableCell className="hidden md:table-cell"><span className="text-xs md:text-sm lg:text-lg">{album.songs?.length}</span> Songs</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => deleteAlbumFunc(album._id as string)}
                  variant={"ghost"}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:scale-110 transition-all duration-300"
                  disabled={loadingSongs[album._id as string]}
                >
                  {loadingSongs[album._id as string] ? (
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
              className="text-center py-8 text-red-600 text-xl mt-6 pl-32"
            >
              No Albums Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AlbumTable;
