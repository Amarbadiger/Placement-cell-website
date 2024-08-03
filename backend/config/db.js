const mongoose = require("mongoose");

const colors = require("colors");
//connecting to Data base
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
