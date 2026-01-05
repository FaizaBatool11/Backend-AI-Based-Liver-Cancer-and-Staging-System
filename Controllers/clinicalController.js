// import db from "../models/index.js";
// const { ClinicalData, Patient } = db;

// /**
//  * CREATE Clinical Data
//  * Doctor adds clinical data for a patient
//  */
// export const createClinicalData = async (req, res) => {
//   try {
//     const { patient_id, age_at_index, bmi, tumor_nodul, hepatitis, afp, afp_group, alk, days_to_last_follow_up, metastasis } = req.body;

//     if (!patient_id) {
//       return res.status(400).json({ message: "patient_id is required" });
//     }

//     const clinical = await ClinicalData.create({
//       patient_id,
//       age_at_index,
//       bmi,
//       tumor_nodul,
//       hepatitis,
//       afp,
//       afp_group,
//       alk,
//       days_to_last_follow_up,
//       metastasis,
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
//  * GET Clinical Data for a Patient
//  */
// export const getClinicalData = async (req, res) => {
//   try {
//     const { patient_id } = req.params;

//     const clinical = await ClinicalData.findOne({
//       where: { patient_id },
//       include: [{ association: "patient" }],
//     });

//     if (!clinical) {
//       return res.status(404).json({ message: "Clinical data not found" });
//     }

//     return res.status(200).json(clinical);
//   } catch (error) {
//     console.error("Get Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * UPDATE Clinical Data
//  */
// export const updateClinicalData = async (req, res) => {
//   try {
//     const { patient_id } = req.params;

//     const clinical = await ClinicalData.findOne({ where: { patient_id } });

//     if (!clinical) {
//       return res.status(404).json({ message: "Clinical data not found" });
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
//     const { patient_id } = req.params;

//     const clinical = await ClinicalData.findOne({ where: { patient_id } });

//     if (!clinical) {
//       return res.status(404).json({ message: "Clinical data not found" });
//     }

//     await clinical.destroy();

//     return res.status(200).json({ message: "Clinical data deleted successfully" });
//   } catch (error) {
//     console.error("Delete Clinical Data Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

import db from "../models/index.js";
const { ClinicalData, Patient } = db;

/**
 * CREATE Clinical Data
 */
export const createClinicalData = async (req, res) => {
  try {
    const { patient_id, age_at_index, bmi, tumor_nodul, hepatitis, afp, afp_group, alk, days_to_last_follow_up, metastasis } = req.body;

    if (!patient_id) {
      return res.status(400).json({ message: "patient_id is required" });
    }

    const clinical = await ClinicalData.create({
      patient_id,
      age_at_index,
      bmi,
      tumor_nodul,
      hepatitis,
      afp,
      afp_group,
      alk,
      days_to_last_follow_up,
      metastasis,
    });

    // Fetch the record again including patient
    const clinicalWithPatient = await ClinicalData.findOne({
      where: { id: clinical.id },
      include: [{ model: Patient, as: "patient" }]
    });

    return res.status(201).json({
      message: "Clinical data created successfully",
      clinical: clinicalWithPatient,
    });
  } catch (error) {
    console.error("Create Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET Clinical Data for a Patient
 */
export const getClinicalData = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const clinical = await ClinicalData.findOne({
      where: { patient_id },
      include: [{ model: Patient, as: "patient" }]
    });

    if (!clinical) {
      return res.status(404).json({ message: "Clinical data not found" });
    }

    return res.status(200).json(clinical);
  } catch (error) {
    console.error("Get Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE Clinical Data
 */
export const updateClinicalData = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const clinical = await ClinicalData.findOne({ where: { patient_id } });

    if (!clinical) {
      return res.status(404).json({ message: "Clinical data not found" });
    }

    await clinical.update(req.body);

    // Fetch updated record with patient
    const updatedClinical = await ClinicalData.findOne({
      where: { patient_id },
      include: [{ model: Patient, as: "patient" }]
    });

    return res.status(200).json({
      message: "Clinical data updated successfully",
      clinical: updatedClinical,
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
    const { patient_id } = req.params;

    const clinical = await ClinicalData.findOne({ where: { patient_id } });

    if (!clinical) {
      return res.status(404).json({ message: "Clinical data not found" });
    }

    await clinical.destroy();

    return res.status(200).json({ message: "Clinical data deleted successfully" });
  } catch (error) {
    console.error("Delete Clinical Data Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
