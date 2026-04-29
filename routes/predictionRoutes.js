import express from "express";
import {
  createPrediction,
  getAllPredictions,
  getPredictionById,
  updatePrediction,
  deletePrediction,
} from "../Controllers/predictionController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 ALL ROUTES PROTECTED

// CREATE
router.post("/", authMiddleware, createPrediction);

// READ
router.get("/", authMiddleware, getAllPredictions);
router.get("/:id", authMiddleware, getPredictionById);

// UPDATE
router.put("/:id", authMiddleware, updatePrediction);

// DELETE
router.delete("/:id", authMiddleware, deletePrediction);

export default router;