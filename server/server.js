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

// app.use(serveStatic(path.join(__dirname, "../uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json("content-type", "application/json"));

app.use(express.static("uploads"));

app.use("/api/v1/upload", upload);
app.use("/api/v1/user", user);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server Started Listening On PORT ${PORT}`);
});
