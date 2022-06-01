const multer = require("multer");
// const uploadImage = require("../../models/fileUpload");
const sharp = require("sharp");

// Locally Storing images
const Storage = multer.diskStorage({
  destination: "uploads/image/actual-size",
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

const actualSizeImageUpload = async (req, res) => {
  // try {
  //   upload(req, res, (err) => {
  //     if (err) {
  //       res.status(400).json({
  //         success: false,
  //         message: "Saving Failed",
  //       });
  //     } else {
  //       const newImage = new uploadImage({
  //         name: req.body.name,
  //         image: {
  //           data: req.body.image,
  //           contentType: "image/png",
  //         },
  //       });

  //       newImage
  //         .save()
  //         .then(() => {
  //           res.status(201).json({
  //             success: true,
  //             msg: "Saved Successfully",
  //           });
  //         })
  //         .catch((error) => {
  //           res.status(500).json({
  //             success: false,
  //             msg: error.data,
  //           });
  //         });
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    const bufferFile = req.file.buffer;
    const originalFileName = req.file.originalname;

    const newName = `${originalFileName}`;
    // console.log("newName: " + newName);

    console.log("file", req.file);
    // console.log("body", req.body);

    const IMAGE = await sharp(bufferFile)
      .resize({
        fit: "contain",
        kernel: sharp.kernel.nearest,
      })
      .toFile("uploads/image/actual-size/" + newName);

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

module.exports = { actualSizeImageUpload };
