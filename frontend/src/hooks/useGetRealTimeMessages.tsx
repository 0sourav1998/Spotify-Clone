import { RootState } from "@/main";
import { addMessage } from "@/redux/slice/chat/chat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRealTimeMessages = () => {
  const { socket } = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);
  
  useEffect(() => {
    socket?.on("send_message", (message) => {
      console.log("MESSAGES",message);
      dispatch(addMessage([...messages, message]));
    });
  }, [socket, dispatch, messages]);
};

export default useGetRealTimeMessages;
