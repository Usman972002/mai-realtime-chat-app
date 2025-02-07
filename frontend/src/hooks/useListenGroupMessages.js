import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";

const useListenGroupMessages = () => {
  const { socket } = useSocketContext();
  const { groupMessages, setGroupMessages } = useConversation();

  useEffect(() => {
    socket?.on("newGroupMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setGroupMessages([...groupMessages, newMessage]);
    });

    return () => socket?.off("newGroupMessage");
  }, [socket, setGroupMessages, groupMessages]);
};
export default useListenGroupMessages;