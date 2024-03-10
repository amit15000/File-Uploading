const { Router } = require("express");
const { upload, localFileUpload } = require("../controllers/FileUpload");

const route = Router();

route.post("/localFileUpload", localFileUpload);

module.exports = route;
