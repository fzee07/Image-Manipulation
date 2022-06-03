const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/image/actual-size");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerError = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(418).json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      res.status(418).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};
// image path
// limit: 5mb
// filter : png, jpeg,jpg
var upload = multer({
  //   storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
  multerError: multerError,
});

module.exports = upload;
