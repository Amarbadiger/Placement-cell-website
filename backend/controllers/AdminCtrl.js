const userModel = require("../models/userModels");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRECT,
});

// Multer storage configuration
const storage = multer.diskStorage({});

const upload = multer({ storage });

const getAllusersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Data Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Users Data",
      error,
    });
  }
};

// Get All Recruiters
const getAllRecruiter = async (req, res) => {
  try {
    const users = await userModel.find({});
    const recruiters = users.filter((user) => user.role === "recruiter");
    res.status(200).send({
      success: true,
      message: "Recruiters Fetched Successfully",
      data: recruiters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Recruiters Data",
      error,
    });
  }
};

// Get All Students
const getAllStudent = async (req, res) => {
  try {
    const user = await userModel.find({});
    const student = user.filter((user) => user.role === "student");
    res.status(200).send({
      success: true,
      message: "Students Fetched Successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while Fetching students List",
      success: false,
      error,
    });
  }
};

// POST route for image and text upload
const postUpdate = [
  upload.single("image"),
  async (req, res) => {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Get text from request body
      const text = req.body.text;

      // Optionally, save image URL and text to your database
      // Example:
      // await YourDatabaseModel.create({ text, imageUrl: result.secure_url });

      // Respond with success message or image details
      res.json({ success: true, text, imageUrl: result.secure_url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Error uploading data" });
    }
  },
];

module.exports = {
  getAllusersController,
  getAllRecruiter,
  getAllStudent,
  postUpdate,
};
