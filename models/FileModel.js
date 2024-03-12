const { default: mongoose } = require("mongoose");
require("dotenv").config();
const { transporter } = require("../config/transporter");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});
//post

fileSchema.post("save", async function (doc) {
  try {
    console.log("Saved Document", doc);

    //transporter

    //send mail
    let info = await transporter.sendMail({
      from: "EdTech",
      to: doc.email,
      subject: "New File Uploaded to Cloudinary",
      html: `<h2>File Uploaded At ${Date()} </h2> <p><a href="${
        doc.fileUrl
      }">Click To Visit</a></p>`,
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
