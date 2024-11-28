
import FeaturedSongs from "./FeaturedSongs";
import MadeForYou from "./MadeForYou";
import TrendingSongs from "./TrendingSongs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TopBar from "../../components/TopBar"

const Homepage = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <ScrollArea className="flex-1 w-full mx-auto mt-1 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md overflow-y-auto md:p-4 p-1">
        <FeaturedSongs />
        <Separator className="w-full my-4 h-px bg-gray-500" />
        <TrendingSongs />
        <Separator className="w-full my-4 h-px bg-gray-500" />
        <MadeForYou />
      </ScrollArea>
    </div>
  );
};

export default Homepage;
