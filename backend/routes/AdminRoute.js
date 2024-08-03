const express = require("express");
const authMidddleware = require("../middlewares/authMidddleware");
const {
  getAllusersController,
  getAllRecruiter,
  getAllStudent,
  postUpdate,
} = require("../controllers/AdminCtrl");
const router = express.Router();

router.get("/getAllUsers", authMidddleware, getAllusersController);
router.get("/allRecruiter", authMidddleware, getAllRecruiter);
router.get("/allStudent", authMidddleware, getAllStudent);
router.post("/postUpdate", authMidddleware, postUpdate);
module.exports = router;
