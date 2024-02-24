import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { useSidebar } from "../context/SidebarContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Navbar = ({ show }) => {
  const { setShowSidebar } = useSidebar();
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("uid"));

  const logout = async () => {
    await axios.post("https://mie-chat.onrender.com/api/auth/logout");

    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");

    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <span>Mie Chat</span>
        <div className="">
          <img src={auth.photo} alt="profile-pic" />
          <button onClick={() => logout()}>Logout</button>
          <div
            style={
              show
                ? { display: "flex", cursor: "pointer" }
                : { display: "none" }
            }
            className="xmark"
          >
            <FaXmark onClick={() => setShowSidebar((pre) => !pre)} size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
