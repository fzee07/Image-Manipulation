const { check } = require("express-validator");

const imageInputValidation = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("file")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("description")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("height")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  check("width")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    next();
  },
];

module.exports = { imageInputValidation };
