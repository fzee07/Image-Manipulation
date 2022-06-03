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
const upload = require("../controllers/upload/upload");

// API for getting image
router.get("/get-file", getImage);

// API for Uploading Image file
router.post(
  "/actual-size-image-upload",
  // uploads.single("file"),
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
