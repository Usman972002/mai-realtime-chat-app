const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});
const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}
const groupMembers = {};  // {groupId: [socketIds]}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];

// Remove user from all groups
for (const groupId in groupMembers) {
	groupMembers[groupId].delete(socket.id);
	if (groupMembers[groupId].size === 0) {
		delete groupMembers[groupId];
	}
}


		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});

	 	// Handle joining group rooms
	socket.on("joinGroup", (groupId) => {
		console.log(`User ${socket.id} joined group ${groupId}`);
		socket.join(groupId);

		if (!groupMembers[groupId]) {
			groupMembers[groupId] = new Set();
		}
		groupMembers[groupId].add(socket.id);
	});

	// Handle sending group messages
	socket.on("sendGroupMessage", ({ groupId, message }) => {
		console.log(`Sending message to group ${groupId}:`, message);
		io.to(groupId).emit("newGroupMessage", message);  // Send to group members
	});
});

module.exports = { app, server,io ,getReceiverSocketId};
