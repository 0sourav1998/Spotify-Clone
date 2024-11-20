import { ScrollArea } from "@/components/ui/scroll-area";
import useGetMessages from "@/hooks/useGetMessages";
import useGetRealTimeMessages from "@/hooks/useGetRealTimeMessages";
import { RootState } from "@/main";
import { Loader, MessageCirclePlus, Timer } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

const MessageContainer = () => {
  const { id } = useParams();
  useGetMessages(id as string);
  useGetRealTimeMessages();

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { messages , loading } = useSelector((state: RootState) => state.chat);

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight ; 
    }
  },[messages])


  if(loading){
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader className="animate-spin text-green-900"/>
      </div>
    )
  }

  return (
    <ScrollArea ref={scrollRef} className="bg-gray-900 rounded-md p-4 h-[95%]">
      {messages?.length !== 0 ? (
        <div className="p-3">
          {messages?.map((msg) => {
            const createdAtDate = parseISO(msg.createdAt);
            const timeAgo = formatDistanceToNow(createdAtDate, {
              addSuffix: true,
            });
            return (
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
                <div className="flex flex-col mb-6 gap-1 max-w-[45%] flex-wrap">
                  <div
                    className={`w-full text-gray-300 font-medium rounded-lg break-words whitespace-normal p-2 ${
                      msg.senderId?.clerkId === id
                        ? "bg-blue-600 text-right"
                        : "bg-gray-700 text-left"
                    }`}
                  >
                    <span className="pb-4 text-[10px]">{msg.message}</span>
                  </div>
                  <span className="text-[8px] gap-2 text-gray-200 flex items-center">
                    <Timer size={16} />
                    {timeAgo}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="font-bold text-gray-400 flex gap-4 items-center justify-center h-[50vh]">
          <MessageCirclePlus className="size-8" />
          <span>No Messages Found</span>
        </p>
      )}
    </ScrollArea>
  );
};

export default MessageContainer;
