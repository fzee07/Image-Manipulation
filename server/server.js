const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/connectDB");
connectDB();
const upload = require("./routes/uploadsFile");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json("content-type", "application/json"));

app.use("/api/v1/upload", upload);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server Started Listening On PORT ${PORT}`);
});
