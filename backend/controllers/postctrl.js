const Post = require("../models/PostModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRECT,
});

// Multer storage configuration
const storage = multer.diskStorage({});

const upload = multer({ storage });

// CREATE: Add a new post
const createPost = [
  upload.single("image"),
  async (req, res) => {
    try {
      // Upload image to Cloudinary
      let imageUrl = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      // Get text from request body
      const { title, content, author } = req.body;

      // Validate the request body
      if (!title || !content || !author) {
        return res.status(400).json({
          message: "Title, content, and author are required",
          success: false,
        });
      }

      // Save image URL and text to your database
      const newPost = new Post({
        title,
        content,
        author,
        image: imageUrl, // Save the image URL if available
      });

      await newPost.save();
      res.status(201).send({
        success: true,
        message: "Posted successfully",
        imageUrl,
        title,
        content,
        author,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ success: false, error: "Error uploading data" });
    }
  },
];

// get all posts
const getPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ author: userId });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE: Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res
      .status(200)
      .send({ message: "Post deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE: Update a post by ID
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Validate the request body
    if (!title && !content) {
      return res.status(400).json({
        message: "At least one field (title or content) is required to update",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }
    res
      .status(200)
      .send({ message: "Updated successfully", updatedPost, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a single post using get
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Post already liked" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ success: true, message: "Post liked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (!post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Post not liked" });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({ success: true, message: "Post unliked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text, userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    post.replies.push({
      userId,
      text,
      userProfilePic: req.user.image, // Assumes user profile picture is available in req.user
      username: req.user.name, // Assumes user name is available in req.user
    });
    await post.save();

    res.status(200).json({ success: true, message: "Comment added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reply to a comment (nested replies)

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  addComment,
};
