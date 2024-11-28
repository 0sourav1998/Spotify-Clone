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

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { messages, loading } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader className="animate-spin text-green-900" />
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className="bg-gray-900 rounded-md p-4 md:h-[95%] h-full">
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
                className={`flex flex-col md:flex-row w-full items-center gap-2 md:gap-4 mb-4 ${
                  msg?.senderId?.clerkId === id
                    ? "md:flex-row-reverse text-right"
                    : "text-left"
                }`}
              >
                <div>
                  <img
                    src={msg.senderId.imageUrl}
                    className="rounded-full md:w-12 md:h-12 w-8 h-8 object-cover"
                    alt="message-image"
                  />
                </div>
                <div className="flex flex-col gap-1 max-w-full w-auto">
                  <div
                    className={`w-full text-gray-300 font-medium rounded-lg break-words whitespace-normal p-2 ${
                      msg.senderId?.clerkId === id
                        ? "bg-blue-600 text-right"
                        : "bg-gray-700 text-left"
                    }`}
                  >
                    <span className="block md:text-base text-sm">{msg.message}</span>
                  </div>
                  <span className="text-[8px] gap-2 text-gray-200 flex items-center justify-start md:text-xs">
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
