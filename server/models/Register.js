const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
