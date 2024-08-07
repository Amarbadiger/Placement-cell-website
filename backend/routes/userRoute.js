const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getAllNotificationController,
  deleteAllNotificationController,
  getProfile,
  editProfile,
  unfollowUser,
  followUser,
} = require("../controllers/userCtrl");
const authMidddleware = require("../middlewares/authMidddleware");

//Router Object
const router = express.Router();

//Routes

//Login || POST
router.post("/login", loginController);

//Register || POST
router.post("/register", registerController);

//Home Page || Auth
router.post("/getUserData", authMidddleware, authController);

// notification
router.post(
  "/get-all-notification",
  authMidddleware,
  getAllNotificationController
);

// delete notification
router.post(
  "/delete-all-notification",
  authMidddleware,
  deleteAllNotificationController
);
// show Profile
router.get("/profile/:id", authMidddleware, getProfile);

//edit profile
router.put("/edit-profile", authMidddleware, editProfile);

// Route to follow a user
router.post("/follow/:userId", authMidddleware, followUser);

// Route to unfollow a user
router.post("/unfollow/:userId", authMidddleware, unfollowUser);

module.exports = router;
