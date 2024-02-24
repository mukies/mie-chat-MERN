import Conversation from "../../components/Conversation";
import Sidebar from "../../components/Sidebar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <Sidebar />

        <Conversation />
      </div>
    </div>
  );
};

export default Home;
