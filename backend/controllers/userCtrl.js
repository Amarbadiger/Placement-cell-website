const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const sendEmail = require("../utils/sendEmail"); // A utility function to send emails
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRECT,
});

// Multer storage configuration
const storage = multer.diskStorage({});

const upload = multer({ storage });

// Register Controller
const registerController = async (req, res) => {
  try {
    // Check if the user already exists in the database
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      // If user exists, return a response indicating the user already exists
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Create a new user instance using the userModel and save it to the database
    const newUser = new userModel(req.body);
    await newUser.save();

    // Send a success response upon successful registration
    res.status(201).send({ success: true, message: "Registration successful" });
  } catch (error) {
    // Handle errors if registration fails
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await userModel.findOne({ email: email });
    if (!user) {
      // If user not found, return a response indicating user not found
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      // If the user is blocked, return a response indicating the account is blocked
      return res.status(200).send({
        message: "Account is blocked. Please contact support.",
        success: false,
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords do not match, return a response indicating invalid email or password
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send a success response with the token upon successful login
    res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error) {
    // Handle errors if login fails
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller Error: ${error.message}`,
    });
  }
};
//Forgot Password Controller

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 1 * 60 * 1000; // 1 minutes

    await user.save();

    // Create reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Email message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 10 minutes.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({
        success: true,
        message: "Email sent successfully. Please check your email.",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res
        .status(500)
        .json({ success: false, message: "Email could not be sent" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user with valid reset token and token hasn't expired
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set new password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//auth Controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false });
  }
};

// Get all Notification
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = seenNotification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete Notification

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notifications",
      error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Fetch the userId from the URL parameter
    const user = await userModel.findOne({ _id: userId }).select("-password");
    res.status(200).send({
      message: "Profile fetched successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const editProfile = [
  upload.single("image"), // Multer middleware to handle single file upload
  async (req, res) => {
    const { name, email, phoneNumber, bio, skills, userId } = req.body;

    try {
      // Find the user by ID
      const user = await userModel.findById(userId);

      if (user) {
        // Update user details only if they are provided
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.bio = bio || user.bio;
        user.skills = skills
          ? skills.split(",").map((skill) => skill.trim())
          : user.skills; // Convert comma-separated string to array

        // Only update the image if a new file is uploaded
        if (req.file) {
          // Upload image to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
          user.image = result.secure_url;
        }

        // Save updated user
        await user.save();

        res.json({ success: true, message: "Profile updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
];

const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.body.userId;

    if (userId === currentUserId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself" });
    }

    const userToFollow = await userModel.findById(userId);
    const currentUser = await userModel.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.following.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already following this user" });
    }

    currentUser.following.push(userId);
    userToFollow.followers.push(currentUserId);

    await currentUser.save();
    await userToFollow.save();

    res
      .status(200)
      .json({ success: true, message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.body.userId;

    if (userId === currentUserId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot unfollow yourself" });
    }

    const userToUnfollow = await userModel.findById(userId);
    const currentUser = await userModel.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!currentUser.following.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "You are not following this user" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await userToUnfollow.save();

    res
      .status(200)
      .json({ success: true, message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// // Get user profile
// const getUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId)
//       .populate('followers', 'name image')
//       .populate('following', 'name image');

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

module.exports = {
  loginController,
  registerController,
  forgotPassword,
  resetPassword,
  authController,
  getAllNotificationController,
  deleteAllNotificationController,
  getProfile,
  editProfile,
  unfollowUser,
  followUser,
};
