const PostModel = require("../models/PostModel");

const getAllPost = async (req, res) => {
  try {
    const allPost = await PostModel.find()
      .populate("author", "image name") // Populate author field with profilePic and name
      .exec();

    if (!allPost) {
      return res.status(200).send({ message: "Not Found", success: true });
    }

    res.status(200).send({ message: "Feeds", success: true, allPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Failed to fetch the feeds", success: false });
  }
};

module.exports = { getAllPost };
