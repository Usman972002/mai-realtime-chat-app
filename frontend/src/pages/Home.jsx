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

  // const handleGroupSelect = (group) => {
  //   console.log(group)
  //   setGroup(true);
  //   setIsConversationSelected(false); // Ensure the UI updates
  // };

  const handleGroupSelect = (group) => {
    console.log("Selected Group:", group);
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

  console.log(isGroup)

  // return (
  //   <div className='flex w-full h-full lg:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
  //     <div className={`flex w-full lg:w-[30%] ${isConversationSelected ? 'hidden lg:flex' : 'flex'}`}>
  //       <Sidebar onConversationSelect={handleConversationSelect} />
  //     </div>
  //     <div className={`flex w-full lg:w-[70%] ${isConversationSelected ? 'flex' : 'hidden lg:flex'}`}>
  //       {isConversationSelected && (
  //         <button
  //           className='absolute top-0 left-1 lg:hidden bg-gray-700 text-white rounded-full p-2'
  //           onClick={handleBackClick}
  //         >
  //           <IoArrowBack className="w-6 h-6" />
  //         </button>
  //       )}
  //       <MessageContainer />
  //     </div>
  //   </div>
  // );
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

        {/* {isConversationSelected ? (
          <MessageContainer />
        ) : selectedGroup ? (
          <GroupMessageContainer />
        ) : 
        ""} */}

      </div>
    </div>
  );

};
export default Home;

