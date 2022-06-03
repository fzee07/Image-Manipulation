const multer = require("multer");
const ImageName = require("../../models/ImageName");
const sharp = require("sharp");

// Locally Storing images
// const Storage = multer.diskStorage({
//   destination: "uploads/image/actual-size",
//   // filename: function (req, file, cb) {
//   //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//   //   cb(null, file.fieldname + "-" + uniqueSuffix);
//   // },
// });

const actualSizeImageUpload = async (req, res) => {
  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;
    const file_input_name = req.body.name;
    console.log("file:::::::::", req.file);
    const newName = `actual-size-${originalFileName}`;

    // console.log("newName: " + newName);

    // console.log("file", req.file);
    // console.log("name", req.body.name);

    const IMAGE = await sharp(bufferFile)
      .resize({
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/actual-size/" + newName);

    const image_size_in_KB = IMAGE.size;
    const temp_file_size = image_size_in_KB / 1024 / 1024;
    const file_size = `${temp_file_size.toFixed(2)} MB`;

    const newImageName = new ImageName({
      file_input_name: file_input_name,
      file_original_name: originalFileName,
      file_new_name: newName,
      file_size: file_size,
    });

    newImageName
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          data: newName,
          image_data: IMAGE,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { actualSizeImageUpload };
