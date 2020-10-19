const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "blog-project",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 100, height: 100, crop: "limit" }],
});

module.exports = multer({ storage: storage })