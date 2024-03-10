const express = require("express");
const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const route = require("./routes/fileRoutes");
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//database and cloudinary connection
dbConnect();
cloudinaryConnect();

//routes
app.use("/api/v1/upload", route);

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
