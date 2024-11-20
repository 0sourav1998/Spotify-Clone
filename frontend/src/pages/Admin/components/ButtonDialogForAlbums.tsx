import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setAllAlbums } from "@/redux/slice/Admin/Admin";
import { createAlbum } from "@/services/operations/Music/Music";
import { albumType } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { Loader, Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const ButtonDialogForAlbums = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const [album, setAlbum] = useState<albumType>({
    title: "",
    artist: "",
    releaseYear : "" ,
    image: null,
  });

  const handleCreateAlbum = async () => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("title", album.title);
    formData.append("artist", album.artist);
    formData.append("releaseYear", album.releaseYear);
    if (album.image) {
      formData.append("imageUrl", album.image);
    }
    try {
      setLoading(true);
      const res = await createAlbum(formData, token as string);
      if (res) {
        dispatch(setAllAlbums(res));
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center bg-green-800 hover:bg-green-900 transition-all duration-300"
        >
          <Plus /> Albums
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-gray-50 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="font-semibold">Add New Album</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Add A New Album To Containerized Your Songs
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="p-6 border border-dashed bg-zinc-700 flex flex-col gap-4 justify-center items-center min-w-full">
            {album.image ? (
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-sm">
                  {album.image.name}
                </span>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => {
                    setAlbum((prev) => ({ ...prev, image: null }));
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
              setAlbum((prev) => ({
                ...prev,
                image: e.target.files?.[0] || null,
              }))
            }
          />

          <input
            placeholder="Album Title"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setAlbum((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            placeholder="Artist"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setAlbum((prev) => ({ ...prev, artist: e.target.value }))
            }
          />
         
         <input
            placeholder="Release Year"
            className="p-2 text-gray-900 rounded-md"
            onChange={(e) =>
              setAlbum((prev) => ({ ...prev, releaseYear : e.target.value }))
            }
          />
         
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
              onClick={handleCreateAlbum}
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

export default ButtonDialogForAlbums;
