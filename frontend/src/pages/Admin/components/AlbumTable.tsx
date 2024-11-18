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
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AlbumTable = () => {
  const { albums } = useSelector((state: RootState) => state.admin);
  const [loadingSongs, setLoadingSongs] = useState<Record<string, boolean>>({});
  const {getToken} = useAuth();
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
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums && albums.length !== 0 ? (
          albums.map((album)=>(
            <TableRow key={album._id}>
            <TableCell className="flex gap-2 items-center">
                <img src={album.imageUrl} className="size-12 rounded-md"/>
                <span>{album.title}</span>
            </TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>{album.releaseYear}</TableCell>
            <TableCell>{album.songs?.length} Songs</TableCell>
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
          <p>No Albums Found</p>
        )}
      </TableBody>
    </Table>
  );
};

export default AlbumTable;
