const { response } = require("express");
const File = require("../models/FileModel");

const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.myfile;
    console.log("File =>", file);
    let path =
      __dirname + "/files" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json({
      success: true,
      messsage: "File Uploaded Successfully",
    });
  } catch (err) {
    console.log("Error in uploading the file");
    console.error(err);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, options) {
  try {
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (err) {
    console.error("Cloudinary Response ", err);
  }
}

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        messsage: "File format not supported",
      });
    }
    //file format matching
    const options = { asset_folder: "AmitFiles", overwrite: true };
    const response = await uploadFileToCloudinary(file, options);

    console.log(response);
    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      messsage: "Image succesfully uploaded ",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      messsage: "Error in uplaoding image ",
    });
  }
};
exports.videoUpload = async (req, res) => {
  try {
    //data fetch

    const { name, tags, email } = req.body;
    const file = req.files.videoFile;
    console.log(name, tags, email, file);
    console.log("File Information:", file);
    //data validation
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);
    const validFileTypes = ["mp4", "mkv", "mov"];

    if (!isFileTypeSupported(fileType, validFileTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    const options = { overwrite: true, resource_type: "video" };

    const response = await uploadFileToCloudinary(file, options);

    console.log("Cloudary Response", response);
    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url,
    });
    res.json({
      success: true,
      videoUrl: response.secure_url,
      messsage: "Video succesfully uploaded ",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
