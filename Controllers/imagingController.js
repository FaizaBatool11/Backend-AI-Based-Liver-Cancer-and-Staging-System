import db from "../models/index.js";
const { ImagingData, Patient } = db;
import multer from "multer";
import path from "path";

// -------------------- Multer Storage --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
export const upload = multer({ storage });

// -------------------- CREATE Imaging Data --------------------
export const createImagingData = async (req, res) => {
  try {
    const { patient_id, scan_type, tumor_size, tumor_stage, vascular_invasion, metastasis, scan_date } = req.body;
    const image_path = req.file ? req.file.path : null;

    if (!patient_id) return res.status(400).json({ message: "patient_id is required" });

    const imaging = await ImagingData.create({
      patient_id,
      scan_type,
      image_path,
      tumor_size,
      tumor_stage,
      vascular_invasion,
      metastasis,
      scan_date,
    });

    const imagingWithPatient = await ImagingData.findOne({
      where: { id: imaging.id },
      include: [{ model: Patient, as: "patient" }],
    });

    res.status(201).json({
      message: "Imaging data created successfully",
      imaging: imagingWithPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET ALL Imaging Data --------------------
export const getAllImagingData = async (req, res) => {
  try {
    const imagingList = await ImagingData.findAll({
      include: [{ model: Patient, as: "patient" }],
    });
    res.status(200).json(imagingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET Imaging Data BY ID --------------------
export const getImagingDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const imaging = await ImagingData.findOne({
      where: { id },
      include: [{ model: Patient, as: "patient" }],
    });
    if (!imaging) return res.status(404).json({ message: "Imaging data not found" });

    res.status(200).json(imaging);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- UPDATE Imaging Data --------------------
export const updateImagingData = async (req, res) => {
  try {
    const { id } = req.params;
    const { scan_type, tumor_size, tumor_stage, vascular_invasion, metastasis, scan_date } = req.body;
    const image_path = req.file ? req.file.path : null;

    const imaging = await ImagingData.findByPk(id);
    if (!imaging) return res.status(404).json({ message: "Imaging data not found" });

    await imaging.update({
      scan_type: scan_type || imaging.scan_type,
      tumor_size: tumor_size || imaging.tumor_size,
      tumor_stage: tumor_stage || imaging.tumor_stage,
      vascular_invasion: vascular_invasion || imaging.vascular_invasion,
      metastasis: metastasis || imaging.metastasis,
      scan_date: scan_date || imaging.scan_date,
      image_path: image_path || imaging.image_path,
    });

    const updatedImaging = await ImagingData.findOne({
      where: { id },
      include: [{ model: Patient, as: "patient" }],
    });

    res.status(200).json({
      message: "Imaging data updated successfully",
      imaging: updatedImaging,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- DELETE Imaging Data --------------------
export const deleteImagingData = async (req, res) => {
  try {
    const { id } = req.params;
    const imaging = await ImagingData.findByPk(id);
    if (!imaging) return res.status(404).json({ message: "Imaging data not found" });

    await imaging.destroy();
    res.status(200).json({ message: "Imaging data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
