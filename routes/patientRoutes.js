// import express from "express";
// import {
//   createPatient,
//   getPatients,
//   getPatientById,
//   updatePatient,
//   deletePatient,
// } from "../Controllers/patientController.js";

// const router = express.Router();

// router.post("/", createPatient);
// router.get("/", getPatients);
// router.get("/:id", getPatientById);
// router.put("/:id", updatePatient);
// router.delete("/:id", deletePatient);

// export default router;

import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../Controllers/patientController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 protected routes
router.post("/", authMiddleware, createPatient);
router.get("/", authMiddleware, getPatients);
router.get("/:id", authMiddleware, getPatientById);
router.put("/:id", authMiddleware, updatePatient);
router.delete("/:id", authMiddleware, deletePatient);

export default router;