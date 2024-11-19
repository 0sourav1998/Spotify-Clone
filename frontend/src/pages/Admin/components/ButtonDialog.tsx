import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/main";
import { setAllSongs } from "@/redux/slice/Admin/Admin";
import { createSong } from "@/services/operations/Music/Music";
import { songType } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { File, Loader, Plus, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ButtonDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const { albums } = useSelector((state: RootState) => state.admin);

  const [song, setSong] = useState<songType>({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    image: null,
    audio: null,
  });

  const handleCreateSong = async () => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("title", song.title);
    formData.append("artist", song.artist);
    formData.append("duration", song.duration.toString());
    if (song.audio) {
      formData.append("audioFile", song.audio);
    }
    if (song.image) {
      formData.append("imageFile", song.image);
    }
    if(song.album){
      formData.append("albumId",song.album)
    }
    try {
      setLoading(true);
      const res = await createSong(formData, token as string);
      if (res) {
        dispatch(setAllSongs(res));
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center bg-green-800 hover:bg-green-900 transition-all duration-300"
        >
          <Plus /> Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-gray-50 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="font-semibold">Add New Song</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Add A New Song To Your Music Library
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* Image Upload */}
          <div className="p-6 border border-dashed bg-zinc-700 flex flex-col gap-4 justify-center items-center min-w-full">
            {song.image ? (
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-sm">
                  {song.image.name}
                </span>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => {
                    setSong((prev) => ({ ...prev, image: null }));
                    if (imageRef.current) imageRef.current.value = "";
                  }}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => imageRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload /> Upload Image
              </Button>
            )}
          </div>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setSong((prev) => ({
                ...prev,
                image: e.target.files?.[0] || null,
              }))
            }
          />

          {/* Audio Upload */}
          <div className="p-6 border border-dashed bg-zinc-700 flex flex-col gap-4 justify-center items-center min-w-full">
            {song.audio ? (
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-sm">
                  {song.audio.name}
                </span>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => {
                    setSong((prev) => ({ ...prev, audio: null }));
                    if (audioRef.current) audioRef.current.value = "";
                  }}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => audioRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload /> Upload Audio
              </Button>
            )}
          </div>
          <input
            ref={audioRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) =>
              setSong((prev) => ({
                ...prev,
                audio: e.target.files?.[0] || null,
              }))
            }
          />

          {/* Form Fields */}
          <input
            placeholder="Song Title"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setSong((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            placeholder="Artist"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setSong((prev) => ({ ...prev, artist: e.target.value }))
            }
          />
          <input
            placeholder="Duration"
            type="number"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setSong((prev) => ({
                ...prev,
                duration: Number(e.target.value),
              }))
            }
          />
          <select
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setSong((prev) => ({ ...prev, album: e.target.value }))
            }
          >
            <option value="">Select Album</option>
            {albums?.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              className="bg-red-600"
            >
              Cancel
            </Button>
            <Button
              className="bg-green-700"
              onClick={handleCreateSong}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonDialog;
