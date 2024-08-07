const JWT = require("jsonwebtoken");
const User = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Auth Failed", success: false });
      } else {
        req.body.userId = decode.id;
        const user = await User.findById(decode.id).select("-password");
        if (!user) {
          return res
            .status(401)
            .send({ message: "Auth Failed", success: false });
        }
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
