import express from "express";
import {
  createImagingData,
  getAllImagingData,
  getImagingDataById,
  updateImagingData,
  deleteImagingData,
  upload,
} from "../Controllers/imagingController.js";

const router = express.Router();

// CREATE
router.post("/", upload.single("image_file"), createImagingData);

// READ
router.get("/", getAllImagingData);
router.get("/:id", getImagingDataById);

// UPDATE
router.put("/:id", upload.single("image_file"), updateImagingData);

// DELETE
router.delete("/:id", deleteImagingData);

export default router;
