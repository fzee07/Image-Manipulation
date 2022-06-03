const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/connectDB");
connectDB();
const upload = require("./routes/uploadsFile");
const user = require("./routes/user");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json("content-type", "application/json"));

// app.use(express.static());

// console.log(path.join(__dirname, "../uploads/actual-size"));
const actual_size = path.join(__dirname, "../uploads/image/actual-size");
const resized = path.join(__dirname, "../uploads/image/resized");
const thumb_size = path.join(__dirname, "../uploads/image/thumb-size");

app.use("actual_size", express.static(actual_size));

app.use(express.static(actual_size));
app.use(express.static(resized));
app.use(express.static(thumb_size));

app.use("/api/v1/upload", upload);
app.use("/api/v1/user", user);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server Started Listening On PORT ${PORT}`);
});
