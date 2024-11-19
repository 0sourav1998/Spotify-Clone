import { addMessage } from "@/redux/slice/chat/chat";
import { getAllMessages } from "@/services/operations/messages/message";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetMessages = (id: string) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch()

  const getMessages = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await getAllMessages(id, token);
      dispatch(addMessage(res))
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getMessages();
    }
  }, [id]);
};

export default useGetMessages;
