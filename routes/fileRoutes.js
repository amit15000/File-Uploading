const { Router } = require("express");
const {
  upload,
  localFileUpload,
  imageUpload,
  videoUpload,
} = require("../controllers/FileUpload");

const route = Router();

route.post("/localFileUpload", localFileUpload);
route.post("/imageUpload", imageUpload);
route.post("/videoUpload", videoUpload);
module.exports = route;
