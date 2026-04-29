import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "liver_cancer", // folder in cloudinary
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "liver_cancer",
      resource_type: "image",
    };
  },
});
const upload = multer({ storage });

export default upload;