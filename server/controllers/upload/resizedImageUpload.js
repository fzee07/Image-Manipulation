const multer = require("multer"),
  // uploadImage = require("../../models/fileUpload"),
  sharp = require("sharp");

// Locally Storing Images
const Storage = multer.diskStorage({
  destination: "uploads/image/resized",
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, file.fieldname + "-" + uniqueSuffix);
  // },
});

const resizedImageUpload = async (req, res, err) => {
  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;
    const resize = "resized";
    console.log(req.body);

    let height = req.body.height;
    if (height == "") {
      height = null;
    } else {
      height = parseInt(height);
    }
    let width = req.body.width;
    if (width == "") {
      width = null;
    } else {
      width = parseInt(width);
    }

    const newName = `${resize}-${originalFileName}`;
    // console.log("newName: " + newName);

    console.log("file", req.file);
    // console.log("body", req.body);

    const IMAGE = await sharp(bufferFile)
      .resize({
        width: width,
        height: height,
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/resized/" + newName);

    res.status(200).json({
      success: true,
      data: newName,
      image_data: IMAGE,
    });

    console.log("IMAGE", IMAGE);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { resizedImageUpload };
