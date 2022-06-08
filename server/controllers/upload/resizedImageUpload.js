const multer = require("multer"),
  // uploadImage = require("../../models/fileUpload"),
  sharp = require("sharp");

const dest = "uploads/image/resized";
// Locally Storing Images
const Storage = multer.diskStorage({
  destination: dest,
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

    // Generating New Name
    // const newName = `${resize}-${originalFileName}`;

    const name = req.body.name;
    const modName = name.replace(/ /g, "-");
    const newName = `${modName}.jpg`;

    const IMAGE = await sharp(bufferFile)
      .resize({
        width: 800,
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/resized/" + newName);

    const servingFile = "image/resized";
    const toReturn = {
      newName,
      servingFile,
    };

    return toReturn;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { resizedImageUpload };
