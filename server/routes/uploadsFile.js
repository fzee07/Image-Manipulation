const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const {
  actualSizeImageUpload,
  resizedImageUpload,
  thumbSizeImageUpload,
  getImage,
} = require("../controllers/upload/index");

// API for getting image
router.get("/get-file", getImage);

// API for Uploading Image file
router.post(
  "/actual-size-image-upload",
  uploads.single("file"),
  actualSizeImageUpload
);

// API for Resizing Image
router.post("/resizing-image", uploads.single("file"), resizedImageUpload);

// API for Creating Thumbnail of an Image
router.post(
  "/creating-thumb-image",
  uploads.single("file"),
  thumbSizeImageUpload
);

module.exports = router;
