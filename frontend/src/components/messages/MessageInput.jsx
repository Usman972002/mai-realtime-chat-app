import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center p-3 text-white bg-blue-500 rounded-r-lg"
        >
          {loading ? <span className="loading loading-spinner"></span> : <BsSend className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
