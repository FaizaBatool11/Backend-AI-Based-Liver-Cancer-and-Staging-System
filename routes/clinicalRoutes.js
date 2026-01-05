import express from "express";
import {
  createClinicalData,
  getClinicalData,
  updateClinicalData,
  deleteClinicalData,
} from "../Controllers/clinicalController.js";

const router = express.Router();

// Create clinical data
router.post("/", createClinicalData);

// Get clinical data for a patient
router.get("/:patient_id", getClinicalData);

// Update clinical data for a patient
router.put("/:patient_id", updateClinicalData);

// Delete clinical data for a patient
router.delete("/:patient_id", deleteClinicalData);

export default router;
