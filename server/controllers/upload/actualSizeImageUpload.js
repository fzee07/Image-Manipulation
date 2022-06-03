const multer = require("multer");
const ImageName = require("../../models/ImageName");
const sharp = require("sharp");
const freeUpload = require("../../../node_modules/freeupload");
require("dotenv").config();

const keyFilename = process.env.Key_FILE_NAME; //keep the file (downloaded from google cloud service account) in your ptojects root directory and replace the serviceaccount.json with the filename
const bucketName = process.env.BUCKET_NAME; // replace projectId with your firebase project Id
const projectId = process.env.PROJECT_ID; // replace projectId with your firebase project Id

const dest = "uploads/image/actual-size";
// Locally Storing images
const Storage = multer.diskStorage({
  destination: dest,
  //   // filename: function (req, file, cb) {
  //   //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   //   cb(null, file.fieldname + "-" + uniqueSuffix);
  //   // },
});

const actualSizeImageUpload = async (req, res) => {
  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;
    const file_input_name = req.body.name;
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

    // const location = `${dest}/${newName}`;
    const saveToFirebase = async (req, res) => {
      let file = req.file;
      if (file) {
        try {
          let url = await freeUpload.upload(
            file,
            keyFilename,
            bucketName,
            projectId
          );
          return url;
        } catch (err) {
          console.log(err);
        }
      }
    };
    const location = await saveToFirebase(req, res);
    const newImageName = new ImageName({
      image_url: location,
      file_input_name: file_input_name,
      file_original_name: originalFileName,
      file_new_name: newName,
      file_size: file_size,
    });

    // console.log(location);
    newImageName
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          data: newName,
          image_data: IMAGE,
          location: location,
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
