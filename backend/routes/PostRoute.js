const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getPostById,
} = require("../controllers/postctrl");
const authMidddleware = require("../middlewares/authMidddleware");

// CREATE: Add a new post
router.post("/createPost", authMidddleware, createPost);

// GetAll Post of Particar user
router.get("/posts/:id", authMidddleware, getPosts);

// DELETE: Delete a post by ID
router.delete("/posts/:id", authMidddleware, deletePost);

// UPDATE: Update a post by ID
router.put("/posts/:id", authMidddleware, updatePost);

//get Single post to update
router.get("/singleposts/:id", authMidddleware, getPostById);

module.exports = router;
