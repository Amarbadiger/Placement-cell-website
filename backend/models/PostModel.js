const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this refers to your User model
      required: [true, "Author is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
