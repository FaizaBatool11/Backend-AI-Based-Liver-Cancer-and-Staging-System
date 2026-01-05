import db from "../models/index.js";

const { Patient, User } = db;

/**
 * CREATE Patient
 * Doctor creates a new patient
 */
export const createPatient = async (req, res) => {
  console.log("DB:", db);
console.log("Patient:", db.Patient);

  try {
    // Doctor ID comes from frontend temporarily
    const { doctor_id, name, email, contact, gender, age } = req.body;

    if (!doctor_id || !name) {
      return res.status(400).json({ message: "Doctor ID and patient name are required" });
    }

    const patient = await Patient.create({
      doctor_id,
      name,
      email,
      contact,
      gender,
      age,
    });

    return res.status(201).json({
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    console.error("Create Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET All Patients (Doctor-wise)
 */
export const getPatients = async (req, res) => {
  try {
    const { doctor_id } = req.query;

    if (!doctor_id) {
      return res.status(400).json({ message: "doctor_id is required" });
    }

    const patients = await Patient.findAll({
      where: { doctor_id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(patients);
  } catch (error) {
    console.error("Get Patients Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET Single Patient Detail
 */
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id } = req.query;

    const patient = await Patient.findOne({
      where: { id, doctor_id },
      // include: [
      //   { association: "clinical" },
      //   { association: "imaging" },
      // ],
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error("Get Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE Patient
 */
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id } = req.body;

    const patient = await Patient.findOne({
      where: { id, doctor_id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.update(req.body);

    return res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Update Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE Patient
 */
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id } = req.query;

    const patient = await Patient.findOne({
      where: { id, doctor_id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.destroy();

    return res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.error("Delete Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

