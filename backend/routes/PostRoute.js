const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getPostById,
  addComment,
  unlikePost,
  likePost,
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

// Like a post
router.post("/posts/like/:postId", authMidddleware, likePost);

// Unlike a post
router.post("/posts/unlike/:postId", authMidddleware, unlikePost);

// Add a comment to a post
router.post("/posts/comment/:postId", authMidddleware, addComment);

module.exports = router;
