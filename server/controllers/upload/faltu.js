const express = require("express");
const bodyParser = require("body-parser");
const freeUpload = require("freeupload");
const Multer = require("multer");

const keyFilename = "image-manipulation.json"; //keep the file (downloaded from google cloud service account) in your ptojects root directory and replace the serviceaccount.json with the filename
const bucketName = "image-manipulation-de1ac.appspot.com"; // replace projectId with your firebase project Id
const projectId = "image-manipulation-de1ac"; // replace projectId with your firebase project Id



app.post("/upload", Multer.single("file"), async (req, res) => {
  let file = req.file;
  if (file) {
    try {
      let url = await freeUpload.upload(
        file,
        keyFilename,
        bucketName,
        projectId
      );
      res.json(url);
    } catch (err) {}
  }
});

const port = process.env.PORT || 8085;
app.listen(port, () => console.log(`Server Running On Port ${port}`));
