// const fileUpload = require("../../models/fileUpload");

const getImage = async (req, res) => {
  try {
    fileUpload
      .find({})
      .then((images) => {
        res.status(200).json({
          success: true,
          images,
        });
      })
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getImage };
