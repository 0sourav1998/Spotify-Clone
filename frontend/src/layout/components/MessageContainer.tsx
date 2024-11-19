import { ScrollArea } from "@/components/ui/scroll-area";
import useGetMessages from "@/hooks/useGetMessages";
import useGetRealTimeMessages from "@/hooks/useGetRealTimeMessages";
import { RootState } from "@/main";
import { Message } from "@/types";
import { MessageCircleDashed, MessageCirclePlus, Timer } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MessageContainer = () => {
  const { id } = useParams();
  useGetMessages(id as string);
  useGetRealTimeMessages();

  const { messages } = useSelector((state: RootState) => state.chat);

  return (
    <ScrollArea className="">
      {messages?.length !== 0 ? (
        <div className="p-4">
          {messages?.map((msg) => (
            <div
              key={msg._id}
              className={`flex flex-row w-full items-center gap-4 ${
                msg?.senderId?.clerkId === id
                  ? "flex-row-reverse flex-end"
                  : "flex-start"
              }`}
            >
              <div>
                <img
                  src={msg.senderId.imageUrl}
                  className="rounded-full size-12"
                />
              </div>
              <div
                className={`text-gray-300 font-medium p-4 mb-4 w-[30%] rounded-lg shadow-lg ${
                  msg.senderId?.clerkId === id
                    ? "bg-blue-600 text-right"
                    : "bg-gray-700 text-left"
                }`}
              >
                <span className="pb-4">{msg.message}</span>
                {/* <span className="text-xs text-gray-200 flex items-center gap-2 mt-2">
                  <Timer size={16} />
                  {msg.createdAt.split("T")[0]}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-bold text-gray-400 flex gap-4 items-center justify-center h-[50vh]">
          <MessageCirclePlus className="size-8"/>
          <span>No Messages Found</span>
        </p>
      )}
    </ScrollArea>
  );
};

export default MessageContainer;
