const contactForm = require("../models/contactForm");
const getcontact = async (req, res) => {
  const { firstname, lastname, email, phone, message } = req.body;
  try {
    const contact = new contactForm({
      firstname,
      lastname,
      email,
      phone,
      message,
    });
    console.log();
    await contact.save();
    res.status(200).send({
      message: "the data is send to admin we will reach you out soon",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong in the contact form",
      success: false,
    });
  }
};

module.exports = { getcontact };
