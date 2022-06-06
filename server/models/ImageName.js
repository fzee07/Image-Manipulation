const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesNameSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image_url: {
      imageUrlOriginal: {
        type: String,
      },
      imageUrlResize: {
        type: String,
      },
      imageUrlCompressed: {
        type: String,
      },
    },
  },
  { versionKey: false }
);

const ImageName = mongoose.model("ImageName", imagesNameSchema);

module.exports = ImageName;
