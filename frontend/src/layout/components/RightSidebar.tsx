import { LoginPrompt } from "@/components/LoginPromt";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/main";
import { setSelectedUser, updateUserActivities } from "@/redux/slice/chat/chat";
import { setUsers } from "@/redux/slice/User/User";
import { getAllUser } from "@/services/operations/User/User";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Music, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { getToken } = useAuth();
  const { user } = useUser();
  const location = useLocation();
  const { onlineUsers , selectedUser , userActivities  } = useSelector((state: RootState) => state.chat);
  const {isPlaying} = useSelector((state:RootState)=>state.player)


    const isListening = (user: User): string => {
      const activity = userActivities.find((activity) => activity[0] === user.clerkId);
      
      if (activity && activity[1] !== "null") {
        return activity[1];
      }
      
      return "Idle";
    };


  const isOnline = (user: User) => {
    const res  = onlineUsers.some((id)=>id === user.clerkId );
    console.log("RES",res);
    return res ;
  };

  const fetchUsers = async (): Promise<void> => {
    const token = await getToken();
    const result = await getAllUser(token);
    dispatch(setUsers(result));
  };

  
  useEffect(() => {
    const socket = io("http://localhost:4000");

    if(socket){
      socket.on("updated_activity", (updateActivities) => {
        dispatch(updateUserActivities(updateActivities))
      });
    }
  },[isPlaying]);
  

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);


  useEffect(()=>{
    dispatch(setSelectedUser(null))
  },[location.pathname,dispatch])
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
              <Link
                to={`/chat/${user.clerkId}`}
                className={`flex items-center gap-4 p-4 ${selectedUser?.clerkId === user.clerkId ? "bg-slate-950 text-gray-400" : "bg-zinc-800 hover:bg-zinc-700"} rounded-lg transition-all duration-200 cursor-pointer`}
                key={user._id}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`${
                      isOnline(user) ? "bg-blue-900 absolute rounded-full bottom-1 -right-0.5 size-3" : "bg-zinc-600 absolute rounded-full bottom-1 -right-0.5 size-3"
                    }`}
                  ></div>
                </div>

                <div className="flex flex-col flex-1 text-gray-300">
                  <span className="text-sm font-medium text-white">
                    {
                    user?.name.split(" ")[1] === "null" ? user?.name.split(" ")[0] : user.name
                    }
                    </span>
                  <div className="flex flex-col mt-1">
                    {isListening(user) !== "Idle" ? (
                      <>
                        <span className="text-xs text-blue-400 font-medium truncate">
                          {isListening(user)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-zinc-500">Idle</span>
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
    </div>
  );
};

export default RightSidebar;
