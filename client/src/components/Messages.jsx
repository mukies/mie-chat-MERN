import Message from "./Message";
import { useRef } from "react";
import { useEffect } from "react";
import useGetMessage from "../hooks/useGetMessage";
import { useSocket } from "../context/SocketContext";

const Messages = () => {
  const endRef = useRef();
  const { messages, setMessages } = useGetMessage();

  const { socket } = useSocket();

  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    socket?.on("newMessage", (newMsg) => {
      setMessages([...messages, newMsg]);
    });

    return () => socket.off("newMessage");
  }, [messages, setMessages, socket]);
  return (
    <div className="messages">
      {messages ? (
        messages?.map((msg, i) => (
          <div ref={endRef} key={i}>
            <Message key={i} message={msg} />
          </div>
        ))
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            Say &lsquo;Hi&lsquo; to start conversation.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
