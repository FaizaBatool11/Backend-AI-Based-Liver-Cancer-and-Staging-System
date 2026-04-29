// import db from "../models/index.js";

// const { ImagingData } = db;

// export const uploadImage = async (req, res) => {
//   try {
//     // ✅ File check
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     // ✅ Get body data
//     const { patient_id, image_type } = req.body;

//     if (!patient_id || !image_type) {
//       return res.status(400).json({
//         message: "patient_id and image_type are required",
//       });
//     }

//     // ✅ Convert patient_id to number
//     const patientId = parseInt(patient_id);

//     // ✅ Cloudinary URL
//     const imageUrl = req.file.path;

//     // ✅ Save in DB
//     const newImage = await ImagingData.create({
//       patient_id: patientId,
//       image_type,
//       image_url: imageUrl,
//     });

//     res.status(201).json({
//       message: "Image uploaded & saved successfully",
//       data: newImage,
//     });

//   } catch (error) {
//     console.error("Upload Error:", error);

//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

import db from "../models/index.js";

const { ImagingData } = db;

export const uploadImage = async (req, res) => {
  try {
    // ✅ File check
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // ✅ Body data
    const { patient_id, scan_type } = req.body;

    // ✅ Validation
    if (!patient_id || !scan_type) {
      return res.status(400).json({
        message: "patient_id and scan_type are required",
      });
    }

    // ✅ Convert patient_id
    const patientId = Number(patient_id);

    // safety check
    if (isNaN(patientId)) {
      return res.status(400).json({
        message: "Invalid patient_id",
      });
    }

    // ✅ Cloudinary URL
    const imageUrl = req.file.path;

    // optional public_id (safe handling)
    const publicId = req.file.filename || null;

    // ✅ Save in DB
    const newImage = await ImagingData.create({
      patient_id: patientId,
      scan_type,        // 🔥 FIXED
      image_url: imageUrl,
      public_id: publicId,
    });

    return res.status(201).json({
      message: "Image uploaded & saved successfully",
      data: newImage,
    });

  // } catch (error) {
  //   console.error("Upload Error:", error);

  //   return res.status(500).json({
  //     message: "Server Error",
  //     error: error.message,
  //   });
  // }

  }catch (error) {
  console.log("❌ ERROR OBJECT:");
  console.dir(error, { depth: null });

  console.log("❌ MESSAGE:", error.message);
  console.log("❌ STACK:", error.stack);

  return res.status(500).json({
    message: "Server Error",
    error: error.message,
  });
}
};