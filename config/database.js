const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DATABASE_URL;
exports.dbConnect = () => {
  mongoose
    .connect(url)
    .then(console.log("Database Connection: Sucessful"))
    .catch((err) => {
      console.log(err.message);
      console.log("Database Connection: Failed");
      process.exit(1);
    });
};
