import { useState } from "react";
import attach from "../img/attach.png";
import { useSend } from "../context/SendMsg";
import { BsSendFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Input = () => {
  const [text, setText] = useState("");
  const { sendMessage, loading } = useSend();

  const handleSend = async () => {
    if (text) {
      await sendMessage(text);
      setText("");
    }
  };

  return (
    <div className="input">
      <input
        onKeyDown={(e) => {
          if (e.key == "Enter") handleSend();
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type a Message..."
      />
      <div>
        <img src={attach} alt="attachment-icon" />
        <button disabled={loading ? true : false} onClick={handleSend}>
          {loading ? (
            <AiOutlineLoading3Quarters size={25} className="send" />
          ) : (
            <BsSendFill size={25} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Input;
