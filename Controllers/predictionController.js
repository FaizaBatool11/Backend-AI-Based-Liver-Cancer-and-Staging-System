import db from "../models/index.js";
const { Prediction, Patient } = db;

// -------------------- CREATE Prediction --------------------
export const createPrediction = async (req, res) => {
  try {
    const { patient_id, cancer_stage, confidence_score, prediction_source } = req.body;

    if (!patient_id) return res.status(400).json({ message: "patient_id is required" });

    const prediction = await Prediction.create({
      patient_id,
      cancer_stage,
      confidence_score,
      prediction_source,
    });

    const predictionWithPatient = await Prediction.findOne({
      where: { id: prediction.id },
      include: [{ model: Patient, as: "patient" }],
    });

    res.status(201).json({
      message: "Prediction created successfully",
      prediction: predictionWithPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET ALL Predictions --------------------
export const getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.findAll({
      include: [{ model: Patient, as: "patient" }],
    });
    res.status(200).json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET Prediction BY ID --------------------
export const getPredictionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prediction = await Prediction.findOne({
      where: { id },
      include: [{ model: Patient, as: "patient" }],
    });
    if (!prediction) return res.status(404).json({ message: "Prediction not found" });

    res.status(200).json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- UPDATE Prediction --------------------
export const updatePrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancer_stage, confidence_score, prediction_source } = req.body;

    const prediction = await Prediction.findByPk(id);
    if (!prediction) return res.status(404).json({ message: "Prediction not found" });

    await prediction.update({
      cancer_stage: cancer_stage || prediction.cancer_stage,
      confidence_score: confidence_score || prediction.confidence_score,
      prediction_source: prediction_source || prediction.prediction_source,
    });

    const updatedPrediction = await Prediction.findOne({
      where: { id },
      include: [{ model: Patient, as: "patient" }],
    });

    res.status(200).json({
      message: "Prediction updated successfully",
      prediction: updatedPrediction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- DELETE Prediction --------------------
export const deletePrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const prediction = await Prediction.findByPk(id);
    if (!prediction) return res.status(404).json({ message: "Prediction not found" });

    await prediction.destroy();
    res.status(200).json({ message: "Prediction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
