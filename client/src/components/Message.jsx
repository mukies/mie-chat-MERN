import { useSelection } from "../context/SelectionContext";
import { formatDate } from "../utils/dateFormatter";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { selectedUser } = useSelection();
  const auth = JSON.parse(localStorage.getItem("uid"));
  // eslint-disable-next-line react/prop-types
  const isMine = auth.id == message.senderID;

  return (
    <div
      className={
        // eslint-disable-next-line react/prop-types
        isMine ? "others-text owner-text" : "others-text"
      }
    >
      <div className="info">
        <img
          src={isMine ? auth.photo : selectedUser?.photo}
          alt="profile-pic"
        />
        {/* eslint-disable-next-line react/prop-types */}
        <span>{formatDate(message.createdAt)}</span>
      </div>
      <div className="content">
        {/* eslint-disable-next-line react/prop-types  */}
        <p>{message?.messageContent}</p>
        {/* <img
          src="https://images.unsplash.com/photo-1554342321-0776d282ceac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image-content"
        /> */}
      </div>
    </div>
  );
};

export default Message;
