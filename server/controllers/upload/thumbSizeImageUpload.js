const multer = require("multer"),
  // uploadImage = require("../../models/fileUpload"),
  sharp = require("sharp");

// Locally Storing images
const Storage = multer.diskStorage({
  destination: "uploads/image/thumb-size",
  // filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, file.fieldname + "-" + uniqueSuffix);
  // },
});

const upload = multer({
  // storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("testImage");

const thumbSizeImageUpload = async (req, res) => {
  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;
    const resize = "thumb";

    const newName = `${resize}-${originalFileName}`;
    // console.log("newName: " + newName);

    console.log("file", req.file);
    // console.log("body", req.body);

    const IMAGE = await sharp(bufferFile)
      .resize({
        width: 150,
        height: 200,
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/thumb-size/" + newName);

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

module.exports = { thumbSizeImageUpload };
