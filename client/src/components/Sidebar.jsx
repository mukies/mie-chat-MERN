import Friends from "./Friends";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar show={false} />
      <Search />
      <Friends />
    </div>
  );
};

export default Sidebar;
