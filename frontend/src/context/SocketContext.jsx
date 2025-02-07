import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const { selectedGroup, setGroupMessages } = useConversation(); 

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:3001", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			socket.on("newGroupMessage", (message) => {
				console.log("New Group Message Received:", message);
				setGroupMessages((prevMessages) => [...prevMessages, message]);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	useEffect(() => {
		if (socket && selectedGroup?._id) {
			console.log("Joining group:", selectedGroup._id);
			socket.emit("joinGroup", selectedGroup._id);
		}
	}, [selectedGroup, socket]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};