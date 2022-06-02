const { status } = require("express/lib/response");
const RegisterSchema = require("../../models/Register");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const newUser = new Register({
    username: username,
    password: password,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        message: "User saved successfully",
        userData: newUser,
      });
    })
    .catch((err) => {
      res,
        status(500).json({
          success: false,
          message: "User not saved, Something went wrong",
        });
    });
};

module.exports = { registerUser };
