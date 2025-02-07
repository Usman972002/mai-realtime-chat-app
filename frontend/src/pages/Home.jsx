import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import { IoArrowBack } from "react-icons/io5";
import GroupMessageContainer from "../components/messages/GroupMessageContainer"
import useConversation from "../zustand/useConversation";

const Home = () => {
  const [isConversationSelected, setIsConversationSelected] = useState(false);
  const [isGroup, setGroup] = useState(false);
  const {selectedGroup, setSelectedGroup } = useConversation();

  const handleConversationSelect = () => {
    setIsConversationSelected(true);
    setGroup(false); // Reset selected group when switching to private messages
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(null); // Reset first
    setTimeout(() => {
      setSelectedGroup(group);
    }, 0); // Ensure state updates before re-render
    setIsConversationSelected(false);
    setGroup(true);
  };
  

  const handleBackClick = () => {
    setIsConversationSelected(false);
    setGroup(false); // Reset when going back
  };

 
  return (
    <div className='flex w-full h-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-2xl gap-1'>
      <div className={`flex w-full lg:w-[30%] bg-white rounded-lg shadow-md p-4 ${isConversationSelected ? 'hidden lg:flex' : 'flex'}`}>
      <Sidebar onConversationSelect={handleConversationSelect} onGroupSelect={handleGroupSelect} />
      </div>
      <div className={`relative flex w-full lg:w-[70%] bg-white rounded-lg shadow-md p-4 ${isConversationSelected ? 'flex' : 'hidden lg:flex'}`}>
        {isConversationSelected && (
          <button
            className='absolute top-10 right-9 lg:hidden bg-white text-black rounded-full p-1 hover:bg-gray-800 transition duration-300 shadow-md'
            onClick={handleBackClick}
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
        )}
        

        {isGroup ? (
          <GroupMessageContainer />
        ) : 
        <MessageContainer />}

      </div>
    </div>
  );

};
export default Home;

