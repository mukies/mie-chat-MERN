import axios from "axios";
import { useState } from "react";
import { useSelection } from "../context/SelectionContext";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSidebar } from "../context/SidebarContext";

const Search = () => {
  const auth = JSON.parse(localStorage.getItem("uid"));
  const { setSelectedUser } = useSelection();
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { setShowSidebar } = useSidebar();

  const searchUser = async () => {
    if (searchText) {
      const { data } = await axios.get(
        `https://mie-chat.onrender.com/api/users/search/${searchText}`
      );
      console.log(data);
      if (data.success && data.data.length) {
        setSearch(data.data);
      } else {
        toast.error("No Users Found !!!");
        setSearchText("");
      }
    }
  };

  const selection = (list) => {
    if (list._id !== auth.id) {
      setSelectedUser(list);
      setShowSidebar((p) => !p);
    } else {
      toast.error("Self chat is not allowed.");
    }
    setSearchText("");
    setSearch(null);
  };

  return (
    <div className="search">
      <div className="input">
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              searchUser();
            }
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Find a Friend"
        />
        <button onClick={searchUser}>
          <IoSearch size={15} color="white" />
        </button>
      </div>

      {search
        ? search.map((list, i) => (
            <div
              onClick={() => selection(list)}
              key={i}
              className="friend-info"
            >
              <img src={list.photo} alt="friend-pic" />
              <div className="">
                <span>{auth.id == list._id ? "You" : list.name}</span>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Search;
