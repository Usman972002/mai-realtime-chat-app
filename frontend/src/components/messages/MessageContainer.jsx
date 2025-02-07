import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect,useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const [conversation, setConversation] = useState(selectedConversation);

  useEffect(() => {
    setConversation(selectedConversation); // Ensure re-render when selection changes
  }, [selectedConversation]);

  return (
    <div className="w-full flex flex-col h-full bg-gray-800 text-white rounded-lg p-4 shadow-lg">
      {!conversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <span className="text-gray-300">To:</span>
            <span className="ml-2 font-semibold">{selectedConversation?.fullname}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );

};
export default MessageContainer;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center text-gray-300 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-4xl text-gray-400" />
      </div>
    </div>
  );

};
