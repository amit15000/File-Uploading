const { Router } = require("express");
const {
  upload,
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/FileUpload");

const route = Router();

route.post("/localFileUpload", localFileUpload);
route.post("/imageUpload", imageUpload);
route.post("/imageSizeReducer", imageSizeReducer);
route.post("/videoUpload", videoUpload);
module.exports = route;
