import { useEffect, useState } from "react";
import axios from "axios";
import { useSelection } from "../context/SelectionContext";
import { useSocket } from "../context/SocketContext";
import { useSidebar } from "../context/SidebarContext";

const Friends = () => {
  const { selectedUser, setSelectedUser } = useSelection();
  const { onlineUser } = useSocket();
  const { setShowSidebar } = useSidebar();
  const token = JSON.parse(localStorage.getItem("token"));

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, []);

  const getFriends = async () => {
    const { data } = await axios.get(
      "https://mie-chat.onrender.com/api/users/all",
      {
        headers: { Authorization: token },
      }
    );
    if (data.success) {
      setFriends(data.data);
    }
  };

  return (
    <div className="friends-list">
      {/* first friend  */}
      <p
        style={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "19px",
          color: "white",
          borderBottom: "1px solid gray",
          marginBlock: "10px",
        }}
      >
        All Users
      </p>

      {friends
        ? friends.map((list, i) => (
            <div
              onClick={() => {
                setSelectedUser(list);
                sessionStorage.setItem("_list", JSON.stringify(list));
                setShowSidebar((p) => !p);
              }}
              key={i}
              className={
                selectedUser?._id == list._id
                  ? "list-container active"
                  : "list-container"
              }
            >
              <div className="user">
                <img src={list.photo} alt="friend-pic" />
                <div
                  style={
                    onlineUser.includes(list._id)
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  className="circle"
                ></div>
              </div>
              <div className="">
                <span>{list.name}</span>
                <p>{selectedUser?._id != list._id ? "Tab to open" : ""}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Friends;
