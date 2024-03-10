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
exports.upload = () => {};
