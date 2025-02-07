import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIndex, onConversationSelect }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
    onConversationSelect();
  };

  return (
    <>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-300 shadow-md hover:bg-blue-500 hover:text-white ${isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-900"}`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold text-lg">{conversation.fullname}</p>
        </div>
      </div>
      {!lastIndex && <div className="border-b border-gray-300" />}
    </>
  );

};
export default Conversation;
