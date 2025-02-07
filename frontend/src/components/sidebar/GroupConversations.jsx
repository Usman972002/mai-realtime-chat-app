import { useState } from "react";
import useGetGroups from "../../hooks/useGetGroups";
import useGetConversations from "../../hooks/useGetConversations";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const GroupConversations = ({ onGroupSelect }) => {
  const { loading, groups } = useGetGroups();
  const { conversation: users } = useGetConversations(); // Fetch users for member selection
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { setSelectedGroup } = useConversation();

  const handleCreateGroup = async () => {
    if (!groupName) return toast.error("Group name is required");
    try {
      const response = await fetch("/api/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupName, members: selectedMembers }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      toast.success("Group created successfully");
      setIsCreatingGroup(false);
      setGroupName("");
      setSelectedMembers([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMemberSelection = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Set the selected group
    onGroupSelect(group); // Notify the parent component
  };

  return (
    <div className="py-4 flex flex-col overflow-auto">
      <button
        className="flex items-center gap-2 p-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => setIsCreatingGroup(!isCreatingGroup)}
      >
        <FaPlus className="w-5 h-5" />
        <span>Create Group</span>
      </button>
      {isCreatingGroup && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter group name"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="mb-2">
            <p className="font-semibold mb-2">Select Members:</p>
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-200"
                onClick={() => handleMemberSelection(user._id)}
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(user._id)}
                  readOnly
                />
                <img
                  src={user.profilePic}
                  alt="user avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-semibold">{user.fullname}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleCreateGroup}
          >
            Create
          </button>
        </div>
      )}
      {groups.map((group) => (
        <div
          key={group._id}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-300 shadow-md hover:bg-blue-500 hover:text-white"
          onClick={() => handleGroupClick(group)} // Use handleGroupClick
        >
          <div className="avatar">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
              <img src="https://via.placeholder.com/150" alt="group avatar" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-semibold text-lg">{group.name}</p>
          </div>
        </div>
      ))}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};
export default GroupConversations;