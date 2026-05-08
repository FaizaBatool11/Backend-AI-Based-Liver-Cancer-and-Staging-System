// import db from "../models/index.js";

// const { Patient, ClinicalData, ImagingData } = db;

// /**
//  * SAFE JSON PARSER
//  */
// const safeParse = (data, fieldName) => {
//   if (!data) return null;

//   if (typeof data === "object") return data;

//   try {
//     return JSON.parse(data);
//   } catch (err) {
//     throw new Error(`Invalid JSON format in ${fieldName}`);
//   }
// };

// export const createFullPatient = async (req, res) => {
//   const t = await db.sequelize.transaction();

//   try {
//     const doctor_id = req.user?.id;

//     let { patient, clinical, scan_type } = req.body;

//     // =========================
//     // SAFE PARSING (FIXED)
//     // =========================
//     try {
//       patient = safeParse(patient, "patient");
//       clinical = safeParse(clinical, "clinical");
//     } catch (err) {
//       return res.status(400).json({
//         message: err.message,
//       });
//     }

//     // =========================
//     // VALIDATION
//     // =========================
//     if (!patient?.name) {
//       return res.status(400).json({
//         message: "Patient name is required",
//       });
//     }

//     if (!clinical?.age) {
//       return res.status(400).json({
//         message: "Clinical age is required",
//       });
//     }

//     // =========================
//     // 1. CREATE PATIENT
//     // =========================
//     const newPatient = await Patient.create(
//       {
//         doctor_id,
//         name: patient.name,
//         email: patient.email || null,
//         contact: patient.contact || null,
//       },
//       { transaction: t }
//     );

//     // =========================
//     // 2. CREATE CLINICAL DATA
//     // =========================
//     const newClinical = await ClinicalData.create(
//       {
//         patient_id: newPatient.id,
//         age: clinical.age,
//         gender: clinical.gender || null,
//         race: clinical.race || null,
//         ethnicity: clinical.ethnicity || null,
//         vital_status: clinical.vital_status || null,
//         days_to_birth: clinical.days_to_birth || null,
//         primary_diagnosis: clinical.primary_diagnosis || null,
//         morphology: clinical.morphology || null,
//         prior_malignancy: clinical.prior_malignancy || null,
//       },
//       { transaction: t }
//     );

//     // =========================
//     // 3. CREATE IMAGING DATA
//     // =========================
//     let newImage = null;

//     if (req.file) {
//       newImage = await ImagingData.create(
//         {
//           patient_id: newPatient.id,
//           scan_type: scan_type || "unknown",
//           image_url: req.file.path || req.file.location || null,
//           public_id: req.file.filename || null,
//         },
//         { transaction: t }
//       );
//     }

//     // =========================
//     // COMMIT TRANSACTION
//     // =========================
//     await t.commit();

//     return res.status(201).json({
//       message: "Full patient data saved successfully",
//       patient: newPatient,
//       clinical: newClinical,
//       imaging: newImage,
//     });

//   } catch (error) {
//     await t.rollback();

//     console.error("❌ Full Patient Error:", error);

//     return res.status(500).json({
//       message: "Error saving full patient data",
//       error: error.message,
//     });
//   }
// };

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

    let { patient, clinical } = req.body;

    // =========================
    // PARSE SAFE JSON
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
    // VALIDATION (NEW STRUCTURE)
    // =========================
    if (!patient?.name) {
      return res.status(400).json({
        message: "Patient name is required",
      });
    }

    if (!patient?.age) {
      return res.status(400).json({
        message: "Patient age is required",
      });
    }

    if (!patient?.gender) {
      return res.status(400).json({
        message: "Patient gender is required",
      });
    }

    if (!clinical?.patient_id && !clinical?.ajcc_pathologic_t) {
      return res.status(400).json({
        message: "Clinical data is required",
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
        age: patient.age,
        gender: patient.gender,
      },
      { transaction: t }
    );

    // =========================
    // 2. CREATE CLINICAL DATA (NEW ONLY FIELDS)
    // =========================
    const newClinical = await ClinicalData.create(
      {
        patient_id: newPatient.id,

        ajcc_pathologic_t: clinical.ajcc_pathologic_t,
        ajcc_staging_system_edition: clinical.ajcc_staging_system_edition,
        ajcc_pathologic_m: clinical.ajcc_pathologic_m,
        ajcc_pathologic_n: clinical.ajcc_pathologic_n,
        days_to_last_follow_up: clinical.days_to_last_follow_up,
        tumor_grade: clinical.tumor_grade,
        ishak_fibrosis_score: clinical.ishak_fibrosis_score,
      },
      { transaction: t }
    );

    // =========================
    // 3. MULTIPLE IMAGING UPLOAD (NEW)
    // =========================
    let savedImages = [];

    if (req.files?.ct_scans) {
      for (const file of req.files.ct_scans) {
        const img = await ImagingData.create(
          {
            patient_id: newPatient.id,
            scan_type: "CT",
            image_url: file.path,
            public_id: file.filename || null,
          },
          { transaction: t }
        );

        savedImages.push(img);
      }
    }

    if (req.files?.mri_scans) {
      for (const file of req.files.mri_scans) {
        const img = await ImagingData.create(
          {
            patient_id: newPatient.id,
            scan_type: "MRI",
            image_url: file.path,
            public_id: file.filename || null,
          },
          { transaction: t }
        );

        savedImages.push(img);
      }
    }

    // =========================
    // COMMIT
    // =========================
    await t.commit();

    return res.status(201).json({
      message: "Full patient created successfully",
      patient: newPatient,
      clinical: newClinical,
      imaging: savedImages,
      total_images: savedImages.length,
    });
  } catch (error) {
    await t.rollback();

    console.error("❌ Full Patient Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};