import db from "../models/index.js";

const { Prediction, Patient } = db;

/**
 * CREATE Prediction (AUTH REQUIRED)
 */
export const createPrediction = async (req, res) => {
  try {
    const doctor_id = req.user.id; // from JWT
    const { patient_id, cancer_stage, confidence_score, prediction_source } = req.body;

    if (!patient_id || !cancer_stage) {
      return res.status(400).json({
        message: "patient_id and cancer_stage are required",
      });
    }

    // 🔐 Check patient belongs to this doctor
    const patient = await Patient.findOne({
      where: {
        id: patient_id,
        doctor_id,
      },
    });

    if (!patient) {
      return res.status(403).json({
        message: "Unauthorized: Patient does not belong to you",
      });
    }

    const prediction = await Prediction.create({
      patient_id,
      cancer_stage,
      confidence_score,
      prediction_source,
    });

    const fullPrediction = await Prediction.findOne({
      where: { id: prediction.id },
      include: [{ model: Patient, as: "patient" }],
    });

    return res.status(201).json({
      message: "Prediction created successfully",
      prediction: fullPrediction,
    });
  } catch (error) {
    console.error("Create Prediction Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL Predictions (only doctor's patients)
 */
export const getAllPredictions = async (req, res) => {
  try {
    const doctor_id = req.user.id;

    const predictions = await Prediction.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          where: { doctor_id }, // 🔐 filter by doctor
        },
      ],
    });

    return res.status(200).json(predictions);
  } catch (error) {
    console.error("Get Predictions Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET Prediction BY ID (AUTH CHECK)
 */
export const getPredictionById = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;

    const prediction = await Prediction.findOne({
      where: { id },
      include: [
        {
          model: Patient,
          as: "patient",
          where: { doctor_id },
        },
      ],
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    return res.status(200).json(prediction);
  } catch (error) {
    console.error("Get Prediction Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE Prediction (AUTH CHECK)
 */
export const updatePrediction = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;
    const { cancer_stage, confidence_score, prediction_source } = req.body;

    const prediction = await Prediction.findOne({
      where: { id },
      include: [
        {
          model: Patient,
          as: "patient",
          where: { doctor_id },
        },
      ],
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    await prediction.update({
      cancer_stage: cancer_stage ?? prediction.cancer_stage,
      confidence_score: confidence_score ?? prediction.confidence_score,
      prediction_source: prediction_source ?? prediction.prediction_source,
    });

    return res.status(200).json({
      message: "Prediction updated successfully",
      prediction,
    });
  } catch (error) {
    console.error("Update Prediction Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE Prediction (AUTH CHECK)
 */
export const deletePrediction = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;

    const prediction = await Prediction.findOne({
      where: { id },
      include: [
        {
          model: Patient,
          as: "patient",
          where: { doctor_id },
        },
      ],
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    await prediction.destroy();

    return res.status(200).json({
      message: "Prediction deleted successfully",
    });
  } catch (error) {
    console.error("Delete Prediction Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};