// controllers/messageController.js
const Message = require("../models/Message");
const User = require("../models/userModels");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user.id; // Extract user ID from auth middleware

    if (!recipientId || !content) {
      return res.status(400).json({
        success: false,
        message: "Recipient ID and message content are required.",
      });
    }

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
      timestamp: new Date(),
    });

    await newMessage.save();

    // Respond with the saved message
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const recipientId = req.params.recipientId;
    const senderId = req.user.id; // Extract user ID from auth middleware

    if (!recipientId) {
      return res
        .status(400)
        .json({ success: false, message: "Recipient ID is required." });
    }

    // Fetch messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
