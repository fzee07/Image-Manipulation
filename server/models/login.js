const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
  //   imageDetails: {
  //     type: mongoose.Types.ObjectId,
  //     ref: "ImageName",
  //   },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
