import { createContext, useContext, useState } from "react";
import { useSelection } from "./SelectionContext";
import axios from "axios";

const SendMsgContext = createContext();

// eslint-disable-next-line react/prop-types
const SendMsgProvider = ({ children }) => {
  const { selectedUser } = useSelection();
  //   MSG STATE IS CREATED TO RERENDER A COMPONENT AFTER SENDING MSG
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const sendMessage = async (message) => {
    setLoading(true);
    const { data } = await axios.post(
      `https://mie-chat.onrender.com/api/message/send/${selectedUser._id}`,
      {
        message,
      },
      {
        headers: { Authorization: token },
      }
    );
    console.log("message", selectedUser._id);

    if (data.success) {
      // CHANGE MSG VALUE AFTER MESSAGE SEND
      setMsg((pre) => !pre);
      setLoading(false);
    }
  };

  return (
    <SendMsgContext.Provider value={{ sendMessage, msg, setMsg, loading }}>
      {children}
    </SendMsgContext.Provider>
  );
};
const useSend = () => useContext(SendMsgContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useSend, SendMsgProvider };
