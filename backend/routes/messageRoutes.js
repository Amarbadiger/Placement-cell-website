const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const authMidddleware = require("../middlewares/authMidddleware");

const router = express.Router();

// Route to send a message
router.post("/send", authMidddleware, sendMessage);

// Route to get messages between two users
router.get("/:recipientId", authMidddleware, getMessages);

module.exports = router;
