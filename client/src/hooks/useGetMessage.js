import axios from "axios";
import { useEffect, useState } from "react";
import { useSelection } from "../context/SelectionContext";
import { useSend } from "../context/SendMsg";

const useGetMessage = () => {
  const { selectedUser } = useSelection();
  const token = JSON.parse(localStorage.getItem("token"));
  const { msg } = useSend();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const { data } = await axios.get(
        `https://mie-chat.onrender.com/api/message/${selectedUser?._id}`,
        {
          headers: { Authorization: token },
        }
      );

      if (data.success && data.conversation.length > 0) {
        setMessages(data.conversation);

        // setMsg((pre) => !pre);
      } else {
        setMessages(null);
      }
    };

    if (selectedUser?._id) getMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?._id, setMessages, msg]);

  return { messages, setMessages };
};

export default useGetMessage;
