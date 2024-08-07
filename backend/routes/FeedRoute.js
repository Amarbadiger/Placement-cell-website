const express = require("express");
const router = express.Router();
const authMidddleware = require("../middlewares/authMidddleware");
const { getAllPost } = require("../controllers/FeedCtrl");

router.get("/allPosts", authMidddleware, getAllPost);

module.exports = router;
