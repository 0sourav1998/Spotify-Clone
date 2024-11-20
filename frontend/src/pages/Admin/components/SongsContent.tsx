import { Card, CardDescription, CardTitle , CardHeader  } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { Music } from "lucide-react";
import SongTable from "./SongTable";
import ButtonDialog from "./ButtonDialog";

const SongsContent = () => {
  return (
    <Card className="bg-zinc-800/80 p-8 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex gap-1 mb-1">
              <div className="flex gap-2 text-gray-100">
                <Music className="size-5 text-green-700"/>
                Songs Library
              </div>
            </CardTitle>
            <CardDescription className="text-gray-400">Manage Your Music Library</CardDescription>
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
