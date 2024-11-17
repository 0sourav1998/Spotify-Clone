import { RootState } from "@/main";
import { Album, Music, Pencil, User, User2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const StatGrid = () => {
  const { stats } = useSelector((state: RootState) => state.admin);
  const statDetails = [
    {
      id: 1,
      title: "Total Songs",
      count: stats.songCount,
      background: "bg-green-700/70",
      icon: <Music className="size-6" />,
    },
    {
      id: 2,
      title: "Total Users",
      count: stats.userCount,
      background: "bg-blue-700/70",
      icon: <User2 className="size-6" />,
    },
    {
      id: 3,
      title: "Total Albums",
      count: stats.albumCount,
      background: "bg-red-700/70",
      icon: <Album className="size-6" />,
    },
    {
      id: 4,
      title: "Total Artists",
      count: stats.uniqueArtistCount,
      background: "bg-yellow-700/70",
      icon: <Pencil className="size-6" />,
    },
  ];
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-2">
      {statDetails.map((details) => (
        <div className="p-8 bg-gray-900 rounded-md flex items-center gap-6" key={details.id}>
            <div className={`${details.background} p-2 w-fit shadow-md rounded-md`}>{details.icon}</div>
            <div className="flex gap-2">
                <span>{details.title} : </span>
                <span>{details.count}</span>
            </div>
        </div>
      ))}
    </div>
  );
};

export default StatGrid;
