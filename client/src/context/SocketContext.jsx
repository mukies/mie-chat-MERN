import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const auth = JSON.parse(localStorage.getItem("uid"));

  useEffect(() => {
    if (auth) {
      const socket = io("https://mie-chat.onrender.com", {
        query: {
          userID: auth?.id,
        },
      });

      setSocket(socket);

      socket.on("onlineUsers", (users) => {
        setOnlineUser(users);
      });

      return () => socket?.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useSocket, SocketProvider };
