const express = require("express");
const { getcontact, contactData } = require("../controllers/contactFormCtrl");
const router = express.Router();
const authMidddleware = require("../middlewares/authMidddleware");

router.post("/contact-form", getcontact);

router.get("/contactData", authMidddleware, contactData);

module.exports = router;
