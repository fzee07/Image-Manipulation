const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const {
  actualSizeImageUpload,
  resizedImageUpload,
  thumbSizeImageUpload,
} = require("../controllers/upload/index");
const upload = require("../controllers/upload/upload");
const {
  imageInputValidation,
} = require("../controllers/upload/validation/imageInputValidation");

// API for Uploading Image file
router.post(
  "/actual-size-image-upload",
  imageInputValidation,
  upload.single("file"),
  actualSizeImageUpload
);

// API for Resizing Image
router.post("/resizing-image", upload.single("file"), resizedImageUpload);

// API for Creating Thumbnail of an Image
router.post(
  "/creating-thumb-image",
  upload.single("file"),
  thumbSizeImageUpload
);

module.exports = router;
