const express = require("express");
const router = express.Router();
const Group = require("../models/groupModel");
const GroupMessage = require("../models/groupMessageModel");
const { jwtMiddleWare } = require("../jwt");
const {getReceiverSocketId ,io} = require('../socket/socket')

router.post("/create", jwtMiddleWare, async (req, res) => {
  try {
    const { name, members } = req.body;
    const adminId = req.user.userId; // Get the admin (creator) ID from the authenticated user

    // Ensure members is an array and includes the admin
    const groupMembers = Array.isArray(members) ? [...members, adminId] : [adminId];

    const newGroup = new Group({
      name,
      admin: adminId,
      members: groupMembers, // Include admin as a member
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in Creating Group:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add members to a group
router.post("/:groupId/add", jwtMiddleWare, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Ensure the authenticated user is the admin of the group
    if (group.admin.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Only the admin can add members" });
    }

    // Add new members to the group
    group.members.push(...members);
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in Adding Members to Group:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:groupId/messages", jwtMiddleWare, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("messages");
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.status(200).json(group.messages || []);
  } catch (error) {
    console.error("Error in Fetching Group Messages:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Send a message in a group
router.post("/:groupId/send", jwtMiddleWare, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;
    const senderId = req.user.userId; // Get the sender's ID from the authenticated user

    const newMessage = new GroupMessage({
      senderId,
      groupId,
      message,
    });

    await newMessage.save();

    // Add the message to the group's messages array
    const group = await Group.findById(groupId);
    group.messages.push(newMessage._id);
    await group.save();

    // Emit the new message to all group members via Socket.IO
    io.to(groupId).emit("newGroupMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in Sending Group Message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtMiddleWare, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the authenticated user's ID
    const groups = await Group.find({ members: userId }).populate("members", "fullname profilePic");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error in Fetching Groups:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;