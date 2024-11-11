import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
    const isLoading = true ;
  return (
    <div className="h-full flex flex-col gap-3 text-white">
      <div className="bg-zinc-800 rounded-md p-4 gap-4 flex flex-col">
        <Link to={"/"} className="flex flex-row gap-4 hover:bg-zinc-900 transition-colors duration-300 p-2 rounded-md">
          <HomeIcon />
          <p className="hidden md:flex">Home</p>
        </Link>
        <SignedIn>
          <Link to={"/chat"} className="flex flex-row gap-4 hover:bg-zinc-900 transition-colors duration-300 p-2 rounded-md">
            <MessageCircle />
            <p className="hidden md:flex">Message</p>
          </Link>
        </SignedIn>
      </div>
      <div className="flex-1 bg-zinc-800 rounded-md p-4 gap-4 flex flex-col">
        <div className="flex gap-2 items-center">
            <Library className="size-5"/>
            <p className="font-bold hidden md:flex">Playlists</p>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
            {
                isLoading ? (<PlaylistSkeleton/>) : (<p>Some Music</p>)
            }
            </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
