import db from "../models/index.js";

const { Patient, ClinicalData, ImagingData } = db;

/**
 * SAFE JSON PARSER
 */
const safeParse = (data, fieldName) => {
  if (!data) return null;

  if (typeof data === "object") return data;

  try {
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Invalid JSON format in ${fieldName}`);
  }
};

export const createFullPatient = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const doctor_id = req.user?.id;

    let { patient, clinical, scan_type } = req.body;

    // =========================
    // SAFE PARSING (FIXED)
    // =========================
    try {
      patient = safeParse(patient, "patient");
      clinical = safeParse(clinical, "clinical");
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    // =========================
    // VALIDATION
    // =========================
    if (!patient?.name) {
      return res.status(400).json({
        message: "Patient name is required",
      });
    }

    if (!clinical?.age) {
      return res.status(400).json({
        message: "Clinical age is required",
      });
    }

    // =========================
    // 1. CREATE PATIENT
    // =========================
    const newPatient = await Patient.create(
      {
        doctor_id,
        name: patient.name,
        email: patient.email || null,
        contact: patient.contact || null,
      },
      { transaction: t }
    );

    // =========================
    // 2. CREATE CLINICAL DATA
    // =========================
    const newClinical = await ClinicalData.create(
      {
        patient_id: newPatient.id,
        age: clinical.age,
        gender: clinical.gender || null,
        race: clinical.race || null,
        ethnicity: clinical.ethnicity || null,
        vital_status: clinical.vital_status || null,
        days_to_birth: clinical.days_to_birth || null,
        primary_diagnosis: clinical.primary_diagnosis || null,
        morphology: clinical.morphology || null,
        prior_malignancy: clinical.prior_malignancy || null,
      },
      { transaction: t }
    );

    // =========================
    // 3. CREATE IMAGING DATA
    // =========================
    let newImage = null;

    if (req.file) {
      newImage = await ImagingData.create(
        {
          patient_id: newPatient.id,
          scan_type: scan_type || "unknown",
          image_url: req.file.path || req.file.location || null,
          public_id: req.file.filename || null,
        },
        { transaction: t }
      );
    }

    // =========================
    // COMMIT TRANSACTION
    // =========================
    await t.commit();

    return res.status(201).json({
      message: "Full patient data saved successfully",
      patient: newPatient,
      clinical: newClinical,
      imaging: newImage,
    });

  } catch (error) {
    await t.rollback();

    console.error("❌ Full Patient Error:", error);

    return res.status(500).json({
      message: "Error saving full patient data",
      error: error.message,
    });
  }
};