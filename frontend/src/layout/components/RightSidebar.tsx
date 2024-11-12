import { LoginPrompt } from "@/components/LoginPromt";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/main";
import { setUsers } from "@/redux/slice/User/User";
import { getAllUser } from "@/services/operations/User/User";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Music, Users } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const isPlaying = true;
  const { users } = useSelector((state: RootState) => state.user);
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  const fetchUsers = async (): Promise<void> => {
    const token = await getToken();
    const result = await getAllUser(token);
    dispatch(setUsers(result));
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="h-screen bg-zinc-900 rounded-lg shadow-lg flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-between p-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="text-xl" />
          <h2 className="text-lg font-semibold">Currently Listening</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1 mt-2">
        <div className="space-y-2">
          {users?.length > 0 ? (
            users.map((user) => (
              <div
                className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all duration-200 cursor-pointer"
                key={user._id}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.imageUrl} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1 text-gray-300">
                  <span className="text-sm font-medium text-white">{user?.name}</span>
                  {isPlaying ? (
                    <div className="flex flex-col mt-1">
                      <span className="text-xs text-blue-400 font-medium truncate">
                        Cardigan
                      </span>
                      <span className="text-xs text-zinc-400 truncate">
                        By Taylor Swift
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500">Idle</span>
                  )}
                </div>

                {isPlaying && (
                  <Music className="text-emerald-500 w-5 h-5 animate-pulse" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500">No users found</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSidebar;
