import add from "../img/add.png";
import camera from "../img/cam.png";

import "./styles/conversation.scss";
import Messages from "./Messages";
import Input from "./Input";
import { useSelection } from "../context/SelectionContext";
import { useSocket } from "../context/SocketContext";
import Friends from "./Friends";
import Search from "./Search";
import Navbar from "./Navbar";
import { useSidebar } from "../context/SidebarContext";
import { FaBars } from "react-icons/fa";
import DefaultPage from "./DefaultPage";

const Conversation = () => {
  const { selectedUser } = useSelection();
  const { onlineUser } = useSocket();
  const { showSidebar, setShowSidebar } = useSidebar();

  return (
    <div className="conversation">
      {selectedUser ? (
        <header>
          <div
            onClick={() => {
              setShowSidebar((pre) => !pre);
            }}
            className="sidebar-btn"
          >
            <FaBars size={25} style={{ marginLeft: "10px" }} />
          </div>
          <p>
            To: <span>{selectedUser?.name} </span>{" "}
            <span className="online">
              {onlineUser?.includes(selectedUser?._id) ? "online" : ""}
            </span>
          </p>
          <div>
            <img src={camera} alt="video-icon" />
            <img src={add} alt="add-icon" />
          </div>
        </header>
      ) : (
        ""
      )}
      {selectedUser ? (
        <>
          <Messages />
          <Input />
        </>
      ) : (
        <DefaultPage />
      )}
      <div className="mini-container">
        <div
          style={showSidebar ? { display: "flex" } : { display: "none" }}
          className="mini-sidebar"
        >
          <Navbar show={true} />
          <Search />
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
