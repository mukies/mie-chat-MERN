import { IoChatbubble } from "react-icons/io5";
import { useSidebar } from "../context/SidebarContext";

const DefaultPage = () => {
  const { setShowSidebar } = useSidebar();
  const auth = JSON.parse(localStorage.getItem("uid"));
  return (
    <div className="default">
      <div className="menu-btn">
        <IoChatbubble
          onClick={() => {
            setShowSidebar((p) => !p);
          }}
          className="btn"
          size={30}
        />
      </div>
      <p>
        Hello {auth.name}, Welcome to <span>Mie Chat.</span>
      </p>
      <p>Select the conversation and start Chatting.</p>
    </div>
  );
};

export default DefaultPage;
