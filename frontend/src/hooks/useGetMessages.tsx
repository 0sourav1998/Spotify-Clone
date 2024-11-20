import { addMessage } from "@/redux/slice/chat/chat";
import { getAllMessages } from "@/services/operations/messages/message";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetMessages = (id: string) => {
  const { getToken } = useAuth();
  const dispatch = useDispatch()

  const getMessages = async () => {
    try {
      const token = await getToken();
      const res = await getAllMessages(id, token);
      dispatch(addMessage(res))
    } catch (err: any) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    if (id) {
      getMessages();
    }
  }, [id]);
};

export default useGetMessages;
