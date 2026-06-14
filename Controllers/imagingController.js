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

//     // ✅ Body data
//     const { patient_id, scan_type } = req.body;

//     // ✅ Validation
//     if (!patient_id || !scan_type) {
//       return res.status(400).json({
//         message: "patient_id and scan_type are required",
//       });
//     }

//     // ✅ Convert patient_id
//     const patientId = Number(patient_id);

//     // safety check
//     if (isNaN(patientId)) {
//       return res.status(400).json({
//         message: "Invalid patient_id",
//       });
//     }

//     // ✅ Cloudinary URL
//     const imageUrl = req.file.path;

//     // optional public_id (safe handling)
//     const publicId = req.file.filename || null;

//     // ✅ Save in DB
//     const newImage = await ImagingData.create({
//       patient_id: patientId,
//       scan_type,        // 🔥 FIXED
//       image_url: imageUrl,
//       public_id: publicId,
//     });

//     return res.status(201).json({
//       message: "Image uploaded & saved successfully",
//       data: newImage,
//     });

//   // } catch (error) {
//   //   console.error("Upload Error:", error);

//   //   return res.status(500).json({
//   //     message: "Server Error",
//   //     error: error.message,
//   //   });
//   // }

//   }catch (error) {
//   console.log("❌ ERROR OBJECT:");
//   console.dir(error, { depth: null });

//   console.log("❌ MESSAGE:", error.message);
//   console.log("❌ STACK:", error.stack);

//   return res.status(500).json({
//     message: "Server Error",
//     error: error.message,
//   });
// }
// };

import db from "../models/index.js";

const { ImagingData } = db;

/**
 * UPLOAD MULTIPLE CT + MRI IMAGES
 */
export const uploadImage = async (req, res) => {
  try {

    // ✅ Files check
    if (!req.files) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    // ✅ Body data
    const { patient_id } = req.body;

    if (!patient_id) {
      return res.status(400).json({
        message: "patient_id is required",
      });
    }

    // ✅ Convert patient_id
    const patientId = Number(patient_id);

    if (isNaN(patientId)) {
      return res.status(400).json({
        message: "Invalid patient_id",
      });
    }

    // ✅ Store saved images
    const savedImages = [];

    /**
     * =========================
     * CT SCANS
     * =========================
     */
    if (req.files.ct_scans) {

      for (const file of req.files.ct_scans) {

        const newImage = await ImagingData.create({

          patient_id: patientId,

          scan_type: "CT",

          image_url: file.path,

          public_id: file.filename || null,
        });

        savedImages.push(newImage);
      }
    }

    return res.status(201).json({
      message: "Images uploaded successfully",
      total_uploaded: savedImages.length,
      data: savedImages,
    });

  } catch (error) {

    console.log("❌ ERROR OBJECT:");
    console.dir(error, { depth: null });

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * GET ALL IMAGES OF PATIENT
 */
export const getPatientImages = async (req, res) => {
  try {

    const { patient_id } = req.params;

    const images = await ImagingData.findAll({
      where: {
        patient_id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      total: images.length,
      data: images,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * GET ONLY CT IMAGES
 */
export const getCTImages = async (req, res) => {
  try {

    const { patient_id } = req.params;

    const images = await ImagingData.findAll({
      where: {
        patient_id,
        scan_type: "CT",
      },
    });

    return res.status(200).json({
      total: images.length,
      data: images,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * GET ONLY MRI IMAGES
 */
// export const getMRIImages = async (req, res) => {
//   try {

//     const { patient_id } = req.params;

//     const images = await ImagingData.findAll({
//       where: {
//         patient_id,
//         scan_type: "MRI",
//       },
//     });

//     return res.status(200).json({
//       total: images.length,
//       data: images,
//     });

//   } catch (error) {

//     return res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };