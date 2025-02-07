import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendGroupMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedGroup, groupMessages, setGroupMessages } = useConversation();

  const sendGroupMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/groups/${selectedGroup._id}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setGroupMessages([...groupMessages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendGroupMessage, loading };
};
export default useSendGroupMessage;