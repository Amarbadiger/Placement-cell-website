const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getAllNotificationController,
  deleteAllNotificationController,
  getProfile,
  editProfile,
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

router.post("/profile", authMidddleware, getProfile);

router.put("/edit-profile", authMidddleware, editProfile);

module.exports = router;