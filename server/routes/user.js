const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/admin/index");
const { getImage } = require("../controllers/upload/index");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/images", getImage);

module.exports = router;
