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

// get contact details to admin
const contactData = async (req, res) => {
  try {
    const data = await contactForm.find();
    if (!data) {
      res
        .status(201)
        .send({ message: "the data is not present", success: true });
    }
    res.status(200).send({
      message: "Contact us submissions fetched successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to Fetch Contacts us Submissions",
      success: false,
    });
  }
};

module.exports = { getcontact, contactData };
