const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesNameSchema = new Schema({
  image_url: {
    type: String,
  },
  file_input_name: {
    type: String,
  },
  file_original_name: {
    type: String,
  },
  file_new_name: {
    type: String,
  },
  file_size: {
    type: String,
  },
});

const ImageName = mongoose.model("ImageName", imagesNameSchema);

module.exports = ImageName;
