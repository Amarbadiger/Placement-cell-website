const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "The firstname must be present"],
  },
  lastname: {
    type: String,
    required: [true, "The lastname must be present"],
  },
  email: {
    type: String,
    required: [true, "The email must be present"],
  },
  phone: {
    type: String,
    required: [true, "The phonenumber must be present"],
  },
  message: {
    type: String,
    required: [true, "The message must be present"],
  },
});

const ContactModel = mongoose.model("ContactModel", contactSchema);
module.exports = ContactModel;
