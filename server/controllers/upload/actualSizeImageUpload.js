const multer = require("multer");
const ImageName = require("../../models/ImageName");
const sharp = require("sharp");
const freeUpload = require("../../../node_modules/freeupload");
require("dotenv").config();
const { resizedImageUpload } = require("./resizedImageUpload");
const { thumbSizeImageUpload } = require("./thumbSizeImageUpload");

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
const PORT = process.env.PORT;

const actualSizeImageUpload = async (req, res) => {
  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;
    const file_input_name = req.body.name;
    // const newName = `actual-size-${originalFileName}`;
    const name = req.body.name;
    const modName = name.replace(/ /g, "-");
    const newName = `${modName}.jpg`;
    const IMAGE = await sharp(bufferFile)
      // .resize({
      //   fit: "contain",
      //   kernel: sharp.kernel.nearest,
      // })
      .toFile("uploads/image/actual-size/" + newName);

    const resize = await resizedImageUpload(req);
    // console.log("resize", resize);
    const thumb = await thumbSizeImageUpload(req);
    // console.log("thumb", thumb);
    const link_prefix = `http://localhost:${PORT}/`;

    // const image_size_in_KB = IMAGE.size;
    // const temp_file_size = image_size_in_KB / 1024 / 1024;
    // const file_size = `${temp_file_size.toFixed(2)} MB`;

    /*-- Saving into firebase --*/
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
    const servingFile = "image/actual-size";
    const title = req.body.name;
    const description = req.body.description;
    const imageUrlOriginal = `${link_prefix}${servingFile}/${newName}`;
    const imageUrlResize = `${link_prefix}${resize.servingFile}/${newName}`;
    const imageUrlCompressed = `${link_prefix}${thumb.servingFile}/${newName}`;
    // const location = await saveToFirebase(req, res);

    const newImage = new ImageName({
      title: title,
      description: description,
      image_url: {
        imageUrlOriginal: imageUrlOriginal,
        imageUrlResize: imageUrlResize,
        imageUrlCompressed: imageUrlCompressed,
      },
    });

    newImage
      .save()
      .then((result) => {
        res.status(200).json({
          success: true,
          msg: "Image Successfully Resized and Saved",
          data: result,
        });
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({
          success: false,
          msg: err.message,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { actualSizeImageUpload };
