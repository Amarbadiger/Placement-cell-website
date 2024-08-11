const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/admin", require("./routes/AdminRoute"));
app.use("/api/v1/hero", require("./routes/contactFormRoute"));
app.use("/api/v1/", require("./routes/PostRoute"));
app.use("/api/v1/feeds", require("./routes/FeedRoute"));
app.use("/api/v1/messege", require("./routes/messageRoutes"));

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
