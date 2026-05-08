import express from "express";
import { createFullPatient } from "../Controllers/fullPatientController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router(); // ✅ MISSING LINE FIXED

// 🔥 Combined route
router.post(
  "/full",
  authMiddleware,
  upload.fields([
    { name: "ct_scans", maxCount: 20 },
    { name: "mri_scans", maxCount: 20 },
  ]),
  createFullPatient
);

export default router; // ✅ REQUIRED