import GroupMessageInput from "./GroupMessageInput";
import GroupMessages from "./GroupMessages";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect,useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const GroupMessageContainer = () => {
  const { selectedGroup, setSelectedGroup } = useConversation();
  const [group, setGroup] = useState(selectedGroup); 

  useEffect(() => {
    setGroup(selectedGroup); // Update when selectedGroup changes
  }, [selectedGroup]);

  return (
    <div className="w-full flex flex-col h-full bg-gray-800 text-white rounded-lg p-4 shadow-lg">
      {!group ? (
        <NoGroupSelected />
      ) : (
        <>
          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <span className="text-gray-300">Group:</span>
            <span className="ml-2 font-semibold">{selectedGroup?.name}</span>
          </div>
          <GroupMessages />
          <GroupMessageInput />
        </>
      )}
    </div>
  );
};

const NoGroupSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center text-gray-300 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname} ❄</p>
        <p>Select a group to start messaging</p>
        <TiMessages className="text-4xl text-gray-400" />
      </div>
    </div>
  );
};

export default GroupMessageContainer;