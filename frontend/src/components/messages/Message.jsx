import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../extractTime";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
		  <div className='chat-image avatar'>
			<div className='w-10 rounded-full overflow-hidden'>
			  <img alt='User avatar' src={profilePic} className='object-cover' />
			</div>
		  </div>
		  <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} shadow-md px-4 py-2`}>{message.message}</div>
		  <div className='chat-footer text-xs text-gray-400'>{formattedTime}</div>
		</div>
	  );

};
export default Message;