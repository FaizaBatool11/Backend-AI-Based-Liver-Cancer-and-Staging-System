// import db from "../models/index.js";

// const { ClinicalData, Patient } = db;

// /**
//  * CREATE Clinical Data (AUTH REQUIRED)
//  */
// export const createClinicalData = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;

//     const {
//       patient_id,
//       age,
//       gender,
//       race,
//       ethnicity,
//       vital_status,
//       days_to_birth,
//       primary_diagnosis,
//       morphology,
//       prior_malignancy,
//     } = req.body;

//     if (!patient_id) {
//       return res.status(400).json({ message: "patient_id is required" });
//     }

//     // 🔐 Ownership check (VERY IMPORTANT)
//     const patient = await Patient.findOne({
//       where: {
//         id: patient_id,
//         doctor_id,
//       },
//     });

//     if (!patient) {
//       return res.status(403).json({
//         message: "Unauthorized: patient does not belong to you",
//       });
//     }

//     const clinical = await ClinicalData.create({
//       patient_id,
//       age,
//       gender,
//       race,
//       ethnicity,
//       vital_status,
//       days_to_birth,
//       primary_diagnosis,
//       morphology,
//       prior_malignancy,
//     });

//     return res.status(201).json({
//       message: "Clinical data created successfully",
//       clinical,
//     });
//   } catch (error) {
//     console.error("Create Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * GET Clinical Data (by patient)
//  */
// export const getClinicalData = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { patient_id } = req.params;

//     // 🔐 verify ownership
//     const patient = await Patient.findOne({
//       where: {
//         id: patient_id,
//         doctor_id,
//       },
//     });

//     if (!patient) {
//       return res.status(403).json({
//         message: "Unauthorized access to patient",
//       });
//     }

//     const clinical = await ClinicalData.findOne({
//       where: { patient_id },
//       include: [{ model: Patient, as: "patient" }],
//     });

//     if (!clinical) {
//       return res.status(404).json({
//         message: "Clinical data not found",
//       });
//     }

//     return res.status(200).json(clinical);
//   } catch (error) {
//     console.error("Get Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAllClinicalData = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;

//     const data = await db.ClinicalData.findAll({
//       attributes: [
//         "id",
//         "patient_id",
//         "age",
//         "gender",
//         "race",
//         "ethnicity",
//         "vital_status",
//         "primary_diagnosis",
//         "createdAt",
//       ],

//       include: [
//         {
//           model: db.Patient,
//           as: "patient",
//           attributes: ["id", "name", "email"],
//           where: { doctor_id }, // 🔐 security filter
//           required: true, // INNER JOIN (faster + secure)
//         },
//       ],

//       order: [["createdAt", "DESC"]],
//     });

//     return res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     console.error("Get All Clinical Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /**
//  * UPDATE Clinical Data
//  */
// export const updateClinicalData = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { patient_id } = req.params;

//     // 🔐 ownership check
//     const patient = await Patient.findOne({
//       where: {
//         id: patient_id,
//         doctor_id,
//       },
//     });

//     if (!patient) {
//       return res.status(403).json({
//         message: "Unauthorized access",
//       });
//     }

//     const clinical = await ClinicalData.findOne({
//       where: { patient_id },
//     });

//     if (!clinical) {
//       return res.status(404).json({
//         message: "Clinical data not found",
//       });
//     }

//     await clinical.update(req.body);

//     return res.status(200).json({
//       message: "Clinical data updated successfully",
//       clinical,
//     });
//   } catch (error) {
//     console.error("Update Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * DELETE Clinical Data
//  */
// export const deleteClinicalData = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { patient_id } = req.params;

//     // 🔐 ownership check
//     const patient = await Patient.findOne({
//       where: {
//         id: patient_id,
//         doctor_id,
//       },
//     });

//     if (!patient) {
//       return res.status(403).json({
//         message: "Unauthorized access",
//       });
//     }

//     const clinical = await ClinicalData.findOne({
//       where: { patient_id },
//     });

//     if (!clinical) {
//       return res.status(404).json({
//         message: "Clinical data not found",
//       });
//     }

//     await clinical.destroy();

//     return res.status(200).json({
//       message: "Clinical data deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

import db from "../models/index.js";

const { ClinicalData, Patient } = db;

/**
 * CREATE Clinical Data (ONLY NEW FIELDS)
 */
export const createClinicalData = async (req, res) => {
  try {
    const doctor_id = req.user.id;

    const {
      patient_id,

      // ✅ ONLY NEW FIELDS
      ajcc_pathologic_t,
      ajcc_staging_system_edition,
      ajcc_pathologic_m,
      ajcc_pathologic_n,
      days_to_last_follow_up,
      tumor_grade,
      ishak_fibrosis_score,
    } = req.body;

    if (!patient_id) {
      return res.status(400).json({ message: "patient_id is required" });
    }

    // 🔐 ownership check
    const patient = await Patient.findOne({
      where: {
        id: patient_id,
        doctor_id,
      },
    });

    if (!patient) {
      return res.status(403).json({
        message: "Unauthorized: patient does not belong to you",
      });
    }

    const clinical = await ClinicalData.create({
      patient_id,

      ajcc_pathologic_t,
      ajcc_staging_system_edition,
      ajcc_pathologic_m,
      ajcc_pathologic_n,
      days_to_last_follow_up,
      tumor_grade,
      ishak_fibrosis_score,
    });

    return res.status(201).json({
      message: "Clinical data created successfully",
      clinical,
    });
  } catch (error) {
    console.error("Create Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET Clinical Data (by patient)
 */
export const getClinicalData = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { patient_id } = req.params;

    const patient = await Patient.findOne({
      where: { id: patient_id, doctor_id },
    });

    if (!patient) {
      return res.status(403).json({
        message: "Unauthorized access to patient",
      });
    }

    const clinical = await ClinicalData.findOne({
      where: { patient_id },
      include: [{ model: Patient, as: "patient" }],
    });

    if (!clinical) {
      return res.status(404).json({
        message: "Clinical data not found",
      });
    }

    return res.status(200).json(clinical);
  } catch (error) {
    console.error("Get Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ALL Clinical Data
 */
export const getAllClinicalData = async (req, res) => {
  try {
    const doctor_id = req.user.id;

    const data = await ClinicalData.findAll({
      attributes: [
        "id",
        "patient_id",

        // ✅ ONLY NEW FIELDS
        "ajcc_pathologic_t",
        "ajcc_staging_system_edition",
        "ajcc_pathologic_m",
        "ajcc_pathologic_n",
        "days_to_last_follow_up",
        "tumor_grade",
        "ishak_fibrosis_score",

        "createdAt",
      ],

      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["id", "name", "email"],
          where: { doctor_id },
          required: true,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Get All Clinical Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * UPDATE Clinical Data
 */
export const updateClinicalData = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { patient_id } = req.params;

    const patient = await Patient.findOne({
      where: { id: patient_id, doctor_id },
    });

    if (!patient) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    const clinical = await ClinicalData.findOne({
      where: { patient_id },
    });

    if (!clinical) {
      return res.status(404).json({
        message: "Clinical data not found",
      });
    }

    await clinical.update(req.body);

    return res.status(200).json({
      message: "Clinical data updated successfully",
      clinical,
    });
  } catch (error) {
    console.error("Update Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE Clinical Data
 */
export const deleteClinicalData = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { patient_id } = req.params;

    const patient = await Patient.findOne({
      where: { id: patient_id, doctor_id },
    });

    if (!patient) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    const clinical = await ClinicalData.findOne({
      where: { patient_id },
    });

    if (!clinical) {
      return res.status(404).json({
        message: "Clinical data not found",
      });
    }

    await clinical.destroy();

    return res.status(200).json({
      message: "Clinical data deleted successfully",
    });
  } catch (error) {
    console.error("Delete Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};