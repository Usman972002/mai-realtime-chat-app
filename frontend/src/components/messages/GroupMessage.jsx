import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../extractTime";

const GroupMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedGroup } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const sender = selectedGroup?.members?.find((member) => member._id === message.senderId);
// Set the correct profile picture
const profilePic = fromMe 
? authUser.profilePic 
: sender?.profilePic || "https://via.placeholder.com/150";
const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full overflow-hidden">
          <img alt="User avatar" src={profilePic} className="object-cover" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} shadow-md px-4 py-2`}>
        {message.message}
      </div>
      <div className="chat-footer text-xs text-gray-400">{formattedTime}</div>
    </div>
  );
};
export default GroupMessage;