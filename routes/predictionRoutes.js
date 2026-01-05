import express from "express";
import {
  createPrediction,
  getAllPredictions,
  getPredictionById,
  updatePrediction,
  deletePrediction,
} from "../Controllers/predictionController.js";

const router = express.Router();

// CREATE
router.post("/", createPrediction);

// READ
router.get("/", getAllPredictions);
router.get("/:id", getPredictionById);

// UPDATE
router.put("/:id", updatePrediction);

// DELETE
router.delete("/:id", deletePrediction);

export default router;
