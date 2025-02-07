import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useState } from "react";
import GroupConversations from "./GroupConversations";
import { FaUsers, FaUserFriends } from "react-icons/fa";

const Sidebar = ({ onConversationSelect, onGroupSelect  }) => {
  const [activeTab, setActiveTab] = useState("private");
  
  return (
    <div className="border-r border-gray-300 w-full flex flex-col bg-white shadow-lg rounded-lg p-4">
        <SearchInput />
      <div className="flex justify-around mb-4">
        <button
          className={`flex items-center gap-2 p-2 rounded-lg transition duration-300 ${
            activeTab === "private"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("private")}
        >
          <FaUserFriends className="w-5 h-5" />
          <span>Private</span>
        </button>
        <button
          className={`flex items-center gap-2 p-2 rounded-lg transition duration-300 ${
            activeTab === "group"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("group")}
        >
          <FaUsers className="w-5 h-5" />
          <span>Group</span>
        </button>
      </div>
      {activeTab === "private" ? (
        <>
          <div className="border-b border-gray-300 my-3"></div>
          <Conversations onConversationSelect={onConversationSelect} />
        </>
      ) : (
        <>
          <GroupConversations onGroupSelect={onGroupSelect} />
        </>
      )}
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
