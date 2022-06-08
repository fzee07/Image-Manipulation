const multer = require("multer"),
  // uploadImage = require("../../models/fileUpload"),
  sharp = require("sharp");

const dest = "uploads/image/thumb-size";
// Locally Storing images
const Storage = multer.diskStorage({
  destination: dest,
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

    // const newName = `${resize}-${originalFileName}`;
    const name = req.body.name;
    const modName = name.replace(/ /g, "-");
    const newName = `${modName}.jpg`;

    const IMAGE = await sharp(bufferFile)
      .resize({
        width: 250,
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/thumb-size/" + newName);

    const servingFile = "image/thumb-size";
    const toReturn = {
      newName,
      servingFile,
    };
    return toReturn;

    console.log("IMAGE", IMAGE);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { thumbSizeImageUpload };
