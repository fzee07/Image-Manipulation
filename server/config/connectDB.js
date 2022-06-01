const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  connectDB: async () => {
    // Database Connection:
    const URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.pax0e.mongodb.net/${process.env.DB_NAME}`;
    mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => {
        console.log("DB Connected");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
