import { Button } from "@/components/ui/button";
import MessageContainer from "@/layout/components/MessageContainer";
import { RootState } from "@/main";
import { addMessage, setSelectedUser } from "@/redux/slice/chat/chat";
import { sendMessage } from "@/services/operations/messages/message";
import { fetchUserById } from "@/services/operations/User/User";
import { useAuth } from "@clerk/clerk-react";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedUser, messages, onlineUsers } = useSelector(
    (state: RootState) => state.chat
  );

  const handleSendMessage = async () => {
    try {
      const token = await getToken();
      setLoading(true);
      let response;
      if (id) {
        response = await sendMessage(
          { message: message, receiverId: id },
          token
        );
      }
      setMessage("");
      dispatch(addMessage([...messages, response]));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    const token = await getToken();
    const result = await fetchUserById(id, token as string);
    if (result) {
      dispatch(setSelectedUser(result));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id, getToken]);

  const isOnline = () => {
    if (id) {
      const res = onlineUsers.some((userId) => userId.trim() === id.trim());
      return res;
    }
  };

  return (
    <div className="text-white h-[93%] flex flex-col overflow-y-hidden relative">
      <div className="flex items-center gap-4 border-b p-4">
        <img
          src={selectedUser?.imageUrl}
          className="h-12 rounded-full border-white"
        />
        <div className="flex flex-row gap-4 items-center">
          <h1 className="font-bold text-gray-400">
            {selectedUser?.name.split(" ")[0]}
          </h1>
          <p className="text-xs">
            {isOnline() ? (
              <span className="bg-blue-700 text-gray-200 font-semibold p-2 rounded-md shadow-md">Online</span>
            ) : (
              <span className="text-gray-700 bg-gray-100 font-semibold  p-2 rounded-md shadow-md">Offline</span>
            )}
          </p>
        </div>
      </div>

      <div className="h-[65vh] overflow-auto p-4">
        <MessageContainer />
      </div>

      <div className="w-full p-4 absolute bottom-12 bg-gray-800 flex items-center gap-2 border-t border-zinc-700">
        <input
          placeholder="Enter Your Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-gray-400 outline-none"
        />
        <Button
          disabled={message === ""}
          onClick={handleSendMessage}
          className="hover:bg-zinc-950 transition-all duration-200"
        >
          {loading ? (
            <Loader className="animate-spin text-blue-700" />
          ) : (
            <Send size={24} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
