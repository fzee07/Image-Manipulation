const ImageName = require("../../models/ImageName");

const getImage = async (req, res) => {
  ImageName.find((err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({
        success: true,
        message: err.message,
      });
    } else {
      console.log(result);
      res.status(200).json({
        success: true,
        message: result,
      });
    }
  });
};

module.exports = { getImage };
