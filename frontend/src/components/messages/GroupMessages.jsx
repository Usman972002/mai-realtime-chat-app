import GroupMessage from "./GroupMessage";
import useGetGroupMessages from "../../hooks/useGetGroupMessages";
import { useEffect, useRef } from "react";
import useListenGroupMessages from "../../hooks/useListenGroupMessages";
import GroupMessageSkeleton from "../skeleton/GroupMessageSkeleton";

const GroupMessages = () => {
  const { groupMessages, loading } = useGetGroupMessages();
  useListenGroupMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [groupMessages]);

  return (
    <div className="flex-1 overflow-auto space-y-2 p-2 bg-gray-800 rounded-md">
      {!loading && groupMessages.length > 0 &&
        groupMessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <GroupMessage message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, index) => <GroupMessageSkeleton key={index} />)}
      {!loading && groupMessages.length === 0 && (
        <p className="text-center text-gray-400">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default GroupMessages;