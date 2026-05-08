import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage, getPatientImages, getCTImages, getMRIImages } from "../controllers/imagingController.js";

const router = express.Router();

// router.post("/upload", upload.single("image"), uploadImage);
router.post(
  "/upload",
  upload.fields([
    { name: "ct_scans", maxCount: 20 },
    { name: "mri_scans", maxCount: 20 },
  ]),
  uploadImage
);

/**
 * GET ALL IMAGES
 */
router.get(
  "/patient/:patient_id",
  getPatientImages
);

/**
 * GET CT IMAGES
 */
router.get(
  "/patient/:patient_id/ct",
  getCTImages
);

/**
 * GET MRI IMAGES
 */
router.get(
  "/patient/:patient_id/mri",
  getMRIImages
);

export default router;