// import db from "../models/index.js";

// const { Patient } = db;

// /**
//  * CREATE Patient (AUTH REQUIRED)
//  */
// export const createPatient = async (req, res) => {
//   try {
//     const doctor_id = req.user.id; // 🔐 from JWT token
//     const { name, email, contact } = req.body;

//     if (!name) {
//       return res.status(400).json({ message: "Patient name is required" });
//     }

//     const patient = await Patient.create({
//       doctor_id,
//       name,
//       email,
//       contact,
//     });

//     return res.status(201).json({
//       message: "Patient created successfully",
//       patient,
//     });
//   } catch (error) {
//     console.error("Create Patient Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * GET ALL Patients (AUTH REQUIRED)
//  */
// export const getPatients = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;

//     const patients = await Patient.findAll({
//       where: { doctor_id },
//       order: [["createdAt", "DESC"]],
//     });

//     return res.status(200).json(patients);
//   } catch (error) {
//     console.error("Get Patients Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * GET Single Patient (AUTH REQUIRED)
//  */
// export const getPatientById = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { id } = req.params;

//     const patient = await Patient.findOne({
//       where: {
//         id,
//         doctor_id,
//       },
//     });

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     return res.status(200).json(patient);
//   } catch (error) {
//     console.error("Get Patient Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * UPDATE Patient (AUTH REQUIRED)
//  */
// export const updatePatient = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { id } = req.params;

//     const patient = await Patient.findOne({
//       where: { id, doctor_id },
//     });

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     await patient.update(req.body);

//     return res.status(200).json({
//       message: "Patient updated successfully",
//       patient,
//     });
//   } catch (error) {
//     console.error("Update Patient Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * DELETE Patient (AUTH REQUIRED)
//  */
// export const deletePatient = async (req, res) => {
//   try {
//     const doctor_id = req.user.id;
//     const { id } = req.params;

//     const patient = await Patient.findOne({
//       where: { id, doctor_id },
//     });

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     await patient.destroy();

//     return res.status(200).json({
//       message: "Patient deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Patient Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

import db from "../models/index.js";

const { Patient } = db;

/**
 * CREATE Patient (AUTH REQUIRED)
 */
export const createPatient = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { name, email, contact, age, gender } = req.body;

    // ✅ Validation
    if (!name) {
      return res.status(400).json({ message: "Patient name is required" });
    }

    if (!age) {
      return res.status(400).json({ message: "Patient age is required" });
    }

    if (!gender) {
      return res.status(400).json({ message: "Patient gender is required" });
    }

    const allowedGender = ["male", "female", "other"];
    if (!allowedGender.includes(gender)) {
      return res.status(400).json({
        message: "Gender must be male, female, or other",
      });
    }

    const patient = await Patient.create({
      doctor_id,
      name,
      email,
      contact,
      age,
      gender,
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
 * GET ALL Patients (AUTH REQUIRED)
 */
export const getPatients = async (req, res) => {
  try {
    const doctor_id = req.user.id;

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
 * GET Single Patient (AUTH REQUIRED)
 */
export const getPatientById = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: {
        id,
        doctor_id,
      },
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
 * UPDATE Patient (AUTH REQUIRED)
 */
export const updatePatient = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id, doctor_id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const { gender } = req.body;

    // optional validation if gender is sent
    if (gender) {
      const allowedGender = ["male", "female", "other"];
      if (!allowedGender.includes(gender)) {
        return res.status(400).json({
          message: "Gender must be male, female, or other",
        });
      }
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
 * DELETE Patient (AUTH REQUIRED)
 */
export const deletePatient = async (req, res) => {
  try {
    const doctor_id = req.user.id;
    const { id } = req.params;

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