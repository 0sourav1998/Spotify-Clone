import { Card, CardDescription, CardTitle , CardHeader  } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { Music } from "lucide-react";
import SongTable from "./SongTable";
import ButtonDialog from "./ButtonDialog";

const SongsContent = () => {
  return (
    <Card className="bg-zinc-800/80 md:p-8 p-3 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-1 mb-1">
              <div className="flex items-center md:gap-2 gap-1 text-gray-100">
                <Music className="md:size-5 size-3 text-green-700"/>
                <span className="md:text-xl text-sm">Songs Library</span>
              </div>
            </CardTitle>
            <CardDescription className="text-gray-400 md:text-lg text-xs">Manage Your Music Library</CardDescription>
          </div>
          <ButtonDialog/>
        </div>
      </CardHeader>
      <CardContent>
        <SongTable/>
      </CardContent>
    </Card>
  );
};

export default SongsContent;
