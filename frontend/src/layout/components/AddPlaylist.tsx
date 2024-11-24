import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Plus } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createPlaylist } from "@/services/operations/Playlist/Playlist";

const AddPlaylist = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [playlist, setPlaylist] = useState({
    title: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPlaylist({ ...playlist, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    try {
      if (!playlist.title || !playlist.image) {
        return alert("Please provide a title and an image.");
      }
      setLoading(true);
      const token = await getToken();
      const formData = new FormData();
      if (user) {
        formData.append("owner", user.id);
      }
      formData.append("title", playlist.title);
      formData.append("imageUrl", playlist.image);

      const result = await createPlaylist(formData, token as string);
      if (result) {
        setPlaylist({ title: "", image: null });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload playlist image"
          />
          <div className="bg-gray-800 border border-dashed border-gray-600 p-6 flex flex-col justify-center items-center w-full rounded-lg transition-all duration-300 hover:bg-gray-700">
            <Button
              className="bg-blue-600 text-white w-fit px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-all"
              onClick={() => imageRef.current?.click()}
            >
              Choose A File
            </Button>
          </div>
          <input
            value={playlist.title}
            onChange={(e) =>
              setPlaylist({ ...playlist, title: e.target.value })
            }
            className="p-3 w-full rounded-md bg-gray-800 border border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 outline-none text-gray-200 placeholder:text-gray-400 shadow-sm"
            placeholder="Enter Playlist Title"
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center"
        >
          {loading ? <Loader className="animate-spin" /> : "Add Playlist"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylist;
