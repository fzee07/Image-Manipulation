const Register = require("../../models/Register");

const loginUser = async (req, res) => {
  const username = req.body.username;
  try {
    await Register.find({ username }, (err, result) => {
      if (err) {
        res.status(404).josn({
          success: false,
          message: "User not found",
        });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { loginUser };
