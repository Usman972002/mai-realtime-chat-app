import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedGroup, groupMessages, setGroupMessages } = useConversation();

  useEffect(() => {
    const getGroupMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/groups/${selectedGroup._id}/messages`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setGroupMessages(data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedGroup?._id) getGroupMessages();
  }, [selectedGroup?._id, setGroupMessages,selectedGroup]);

  return { groupMessages, loading };
};
export default useGetGroupMessages;