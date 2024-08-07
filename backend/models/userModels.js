const mongoose = require("mongoose");

// Define a Mongoose Schema for the User collection
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["student", "recruiter"], // Enum to restrict values to "student" or "recruiter"
      required: [true, "Role is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String], // Change skills to an array of strings
      default: [],
    },
    phoneNumber: {
      type: String, // Define phoneNumber as a String
      default: "", // Provide a default value if necessary
    },
    image: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the schema, named 'User'
const userModel = mongoose.model("users", userSchema);

// Export the User model to use in other parts of the application
module.exports = userModel;
