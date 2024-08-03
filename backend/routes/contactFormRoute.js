const express = require("express");
const { getcontact } = require("../controllers/contactFormCtrl");
const router = express.Router();

router.post("/contact-form", getcontact);

module.exports = router;
