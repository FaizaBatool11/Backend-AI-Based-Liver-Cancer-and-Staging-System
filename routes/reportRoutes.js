import express from "express";
import { createReport } from "../Controllers/reportController.js";
import { generateReport } from "../controllers/reportController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createReport);
router.post("/:id/generate", authMiddleware, generateReport);

export default router;