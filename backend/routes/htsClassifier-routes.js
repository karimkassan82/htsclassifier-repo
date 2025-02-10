const express = require("express");
const htsClassifierController = require("../controllers/htsClassifier-controllers");

const router = express.Router();

router.get(
  "/get-unique-headingId",
  htsClassifierController.findHeadingIdOfTheSearch
);
router.post("/get-next-indent", htsClassifierController.getTheNextIndent);

module.exports = router;
