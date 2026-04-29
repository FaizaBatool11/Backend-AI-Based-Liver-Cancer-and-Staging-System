import express from "express";
import {
  createClinicalData,
  getClinicalData,
  getAllClinicalData,
  updateClinicalData,
  deleteClinicalData,
} from "../Controllers/clinicalController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 All routes protected
router.post("/", authMiddleware, createClinicalData);

router.get("/:patient_id", authMiddleware, getClinicalData);

router.get("/", authMiddleware, getAllClinicalData);

router.put("/:patient_id", authMiddleware, updateClinicalData);

router.delete("/:patient_id", authMiddleware, deleteClinicalData);

export default router;