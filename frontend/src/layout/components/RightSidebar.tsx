import { LoginPrompt } from "@/components/LoginPromt";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/main";
import {
  setSelectedUser,
  setSwitchToChat,
  updateUserActivities,
} from "@/redux/slice/chat/chat";
import { setUsers } from "@/redux/slice/User/User";
import { getAllUser } from "@/services/operations/User/User";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Music, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const { onlineUsers, selectedUser, userActivities } = useSelector(
    (state: RootState) => state.chat
  );
  const { isPlaying } = useSelector((state: RootState) => state.player);
  const { switchToChat } = useSelector((state: RootState) => state.chat);

  const [search, setSearch] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState<User[]>([]);

  const isListening = (user: User): string => {
    const activity = userActivities.find(
      (activity) => activity[0] === user.clerkId
    );

    if (activity && activity[1] !== "null") {
      return activity[1];
    }

    return "Idle";
  };

  const isOnline = (user: User) => {
    const res = onlineUsers.some((id) => id === user.clerkId);
    return res;
  };

  const fetchUsers = async (): Promise<void> => {
    const token = await getToken();
    const result = await getAllUser(token);
    dispatch(setUsers(result));
    setFilteredUser(result);
  };

  const handleSearch = () => {
    const result = users.filter((user) => {
      return user.name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilteredUser(result);
  };

  useEffect(() => {
    const baseUrl =
      import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";
    const socket = io(baseUrl);

    if (socket) {
      socket.on("updated_activity", (updateActivities) => {
        dispatch(updateUserActivities(updateActivities));
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (search === "") {
      setFilteredUser(users);
    }
  }, [search]);

  return (
    <div
      className={`h-[85vh] ${
        switchToChat ? "flex" : "hidden"
      } md:flex bg-zinc-900 rounded-lg shadow-lg flex-col lg:p-2 p-0 md:space-y-4 space-y-1`}
    >
      <div className="flex flex-col gap-4 w-full items-center justify-between p-2 border-b border-zinc-800">
        <div className="flex items-center lg:gap-2 gap-2 text-gray-300 mt-2">
          <Users className="lg:size-6 size-4" />
          <h2 className="lg:text-[14px] text-[8px] sm:10px md:12px font-semibold">
            Currently Listening
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-zinc-700 rounded-lg md:p-3 p-1 shadow-inner">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:p-2 p-1 bg-transparent text-white placeholder-gray-400 rounded-lg md:focus:ring-2 md:focus:ring-blue-600 outline-none"
            placeholder="Search users..."
          />
          <Button
            onClick={handleSearch}
            className="bg-blue-700 hover:bg-blue-600 text-gray-300 md:p-2 p-1.5 rounded-lg"
          >
            <Search className="size-3 md:size-5" />
          </Button>
        </div>
        <div className="flex lg:hidden justify-center p-1 w-full">
          <label className="relative flex gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!switchToChat}
              onChange={() => dispatch(setSwitchToChat(!switchToChat))}
              className="sr-only peer"
            />
            <div className="w-4 h-4 bg-blue-900 peer-focus:outline-none peer-focus:ring-2 rounded-full"></div>
            <span className="text-xs font-medium text-gray-300">
              {switchToChat ? "Normal" : "Chat"}
            </span>
          </label>
        </div>
      </div>

      {!user && <LoginPrompt />}

      {user && isSignedIn && (
        <ScrollArea className="flex-1 mt-2">
          <div className="space-y-2">
            {filteredUser?.length > 0 ? (
              filteredUser.map((user) => (
                <Link
                  to={`/chat/${user.clerkId}`}
                  className={`flex md:flex-row flex-col items-center md:gap-4 gap-2 md:p-4 p-2 ${
                    selectedUser?.clerkId === user.clerkId
                      ? "bg-slate-950 text-gray-400"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  } rounded-lg transition-all duration-200 cursor-pointer`}
                  key={user._id}
                >
                  <div className="relative">
                    <Avatar className="md:w-12 md:h-12 w-6 h-6">
                      <AvatarImage src={user?.imageUrl} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`${
                        isOnline(user)
                          ? "bg-blue-900 absolute rounded-full bottom-0.5 md:bottom-1 -right-0.5 sm:-right-1 md:size-3 size-1.5 sm:size-2"
                          : "bg-zinc-600 absolute rounded-full bottom-0.5 -right-0.5 md:bottom-1 sm:-right-1 md:size-3 size-1.5 sm:size-2"
                      }`}
                    ></div>
                  </div>

                  <div className="flex flex-col flex-1 text-gray-300">
                    <span className="md:text-sm text-[12px] md:font-medium font-normal text-white">
                      {user?.name.split(" ")[1] === "null"
                        ? user?.name.split(" ")[0]
                        : user.name}
                    </span>
                    <div className="flex flex-col mt-1">
                      {isListening(user) !== "Idle" ? (
                        <>
                          <span className="md:text-xs text-[10px] text-blue-400 font-medium truncate">
                            {isListening(user)}
                          </span>
                        </>
                      ) : (
                        <span className="md:text-xs text-[10px] text-zinc-500">
                          Idle
                        </span>
                      )}
                    </div>
                  </div>

                  {isListening(user) !== "Idle" && (
                    <Music className="text-emerald-500 w-5 h-5 animate-pulse" />
                  )}
                </Link>
              ))
            ) : (
              <div className="text-center text-zinc-500">No users found</div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default RightSidebar;
