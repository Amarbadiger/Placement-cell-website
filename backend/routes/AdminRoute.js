const express = require("express");
const authMidddleware = require("../middlewares/authMidddleware");
const {
  getAllusersController,
  getAllRecruiter,
  getAllStudent,
  postUpdate,
  homePagePost,
  singleHomePagePost,
  toggleBlockStatus,
} = require("../controllers/AdminCtrl");
const router = express.Router();

router.get("/getAllUsers", authMidddleware, getAllusersController);
router.get("/allRecruiter", authMidddleware, getAllRecruiter);
router.get("/allStudent", authMidddleware, getAllStudent);
router.post("/postUpdate", authMidddleware, postUpdate);
router.get("/homePagePost", authMidddleware, homePagePost);
router.post("/singleHomePagePost", authMidddleware, singleHomePagePost);
router.post("/block", authMidddleware, toggleBlockStatus);
module.exports = router;
