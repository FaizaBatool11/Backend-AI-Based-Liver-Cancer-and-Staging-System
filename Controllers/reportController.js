// import PDFDocument from "pdfkit";
// import fs from "fs";
// import axios from "axios";
// import db from "../models/index.js";

// const { Report, Patient, ImagingData } = db;

// export const createReport = async (req, res) => {
//   try {
//     const { patient_id, predicted_stage, confidence } = req.body;

//     // validation
//     if (!patient_id) {
//       return res.status(400).json({ message: "patient_id is required" });
//     }

//     const report = await Report.create({
//       patient_id,
//       predicted_stage,
//       confidence,
//     });

//     return res.status(201).json({
//       message: "Report created successfully",
//       report,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const generateReport = async (req, res) => {
//   const id = req.params.id;

//   try {
//     // =========================
//     // 1. FETCH REPORT + PATIENT
//     // =========================
//     const report = await Report.findOne({
//       where: { id },
//       include: [
//         {
//           model: Patient,
//           as: "patient",
//         },
//       ],
//     });

//     if (!report) {
//       return res.status(404).json({ message: "Report not found" });
//     }

//     const patient = report.patient;

//     // =========================
//     // 2. FETCH IMAGES FROM IMAGING TABLE
//     // =========================
//     const images = await ImagingData.findAll({
//       where: {
//         patient_id: report.patient_id,
//       },
//     });

//     // =========================
//     // 3. CREATE PDF
//     // =========================
//     const fileName = `report_${id}.pdf`;
//     const filePath = `uploads/${fileName}`;

//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(filePath);

//     doc.pipe(stream);

//     // ================= TITLE =================
//     doc.fontSize(20).text("AI Liver Cancer Report", {
//       align: "center",
//     });

//     doc.moveDown();

//     // ================= PATIENT INFO =================
//     doc.fontSize(14).text("Patient Information");
//     doc.fontSize(12);
//     doc.text(`Name: ${patient.name}`);
//     doc.text(`Age: ${patient.age}`);
//     doc.text(`Gender: ${patient.gender}`);

//     doc.moveDown();

//     // ================= AI RESULT =================
//     doc.fontSize(14).text("AI Prediction Result");
//     doc.fontSize(12);
//     doc.text(`Predicted Stage: ${report.predicted_stage}`);
//     doc.text(`Confidence: ${report.confidence}%`);

//     doc.moveDown();

//     // ================= IMAGES =================
//     doc.fontSize(14).text("CT Images");

//     for (let img of images) {
//       try {
//         const response = await axios.get(img.image_url, {
//           responseType: "arraybuffer",
//         });

//         doc.image(response.data, {
//           fit: [400, 300],
//           align: "center",
//         });

//         doc.moveDown();
//       } catch (err) {
//         doc.text("Image failed to load");
//       }
//     }

//     doc.end();

//     // ================= SAVE PDF URL =================
//     stream.on("finish", async () => {
//       const pdfUrl = `http://localhost:5000/uploads/${fileName}`;

//       await Report.update(
//         { pdf_url: pdfUrl },
//         { where: { id } }
//       );

//       res.json({
//         message: "Report generated successfully",
//         pdfUrl,
//       });
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import db from "../models/index.js";

const { Report, Patient, ImagingData } = db;

/* =========================
   CREATE REPORT API
========================= */
export const createReport = async (req, res) => {
  try {
    const { patient_id, predicted_stage, confidence } = req.body;

    if (!patient_id) {
      return res.status(400).json({ message: "patient_id is required" });
    }

    const report = await Report.create({
      patient_id,
      predicted_stage,
      confidence,
    });

    return res.status(201).json({
      message: "Report created successfully",
      report,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* =========================
   GENERATE PDF REPORT
========================= */
export const generateReport = async (req, res) => {
  const id = req.params.id;

  try {
    // ================= FETCH REPORT + PATIENT =================
    const report = await Report.findOne({
      where: { id },
      include: [{ model: Patient, as: "patient" }],
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const patient = report.patient;

    // ================= FETCH IMAGES =================
    const images = await ImagingData.findAll({
      where: { patient_id: report.patient_id },
    });

    // ================= SAFE UPLOADS FOLDER =================
    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const fileName = `report_${id}.pdf`;
    const filePath = path.join(uploadDir, fileName);

    // ================= CREATE PDF =================
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    /* ================= HEADER BOX ================= */
    doc
      .rect(50, 40, 500, 60)
      .fill("#1f3b57");

    doc
      .fillColor("white")
      .fontSize(20)
      .text("AI LIVER CANCER DIAGNOSTIC REPORT", 55, 60, {
        align: "center",
      });

    doc.moveDown(2);

    /* ================= PATIENT INFO CARD ================= */
    doc
      .fillColor("#1f3b57")
      .fontSize(14)
      .text("PATIENT INFORMATION", { underline: true });

    doc.moveDown(0.5);

    doc
      .fillColor("black")
      .fontSize(12);

    doc
      .rect(50, doc.y, 500, 70)
      .stroke("#d0d7de");

    doc
      .text(`Name: ${patient.name}`, 60, doc.y + 10)
      .text(`Age: ${patient.age}`, 60)
      .text(`Gender: ${patient.gender}`, 60);

    doc.moveDown(3);

    /* ================= AI RESULT BOX ================= */
    doc
      .fillColor("#1f3b57")
      .fontSize(14)
      .text("AI PREDICTION RESULT", { underline: true });

    doc.moveDown(0.5);

    doc
      .rect(50, doc.y, 500, 60)
      .stroke("#d0d7de");

    doc
      .fillColor("black")
      .fontSize(12)
      .text(`Predicted Stage: ${report.predicted_stage}`, 60, doc.y + 10)
      .text(`Confidence: ${report.confidence}%`, 60);

    doc.moveDown(3);

    /* ================= IMAGES SECTION ================= */
    doc
      .fillColor("#1f3b57")
      .fontSize(14)
      .text("CT SCAN IMAGES", { underline: true });

    doc.moveDown(1);

    if (images.length === 0) {
      doc.fillColor("red").text("No images found");
    } else {
      for (let img of images) {
        try {
          doc.image(img.image_url, {
            fit: [450, 280],
            align: "center",
          });
          doc.moveDown(1);
        } catch (err) {
          doc.fillColor("red").text("⚠ Image failed to load");
        }
      }
    }

    /* ================= FOOTER ================= */
    doc.moveDown(2);

    doc
      .fontSize(10)
      .fillColor("gray")
      .text(
        "This report is generated automatically using AI-based analysis system.",
        {
          align: "center",
        }
      );

    doc.end();

    // ================= SAVE URL =================
    stream.on("finish", async () => {
      const pdfUrl = `http://localhost:5000/uploads/${fileName}`;

      await Report.update(
        { pdf_url: pdfUrl },
        { where: { id } }
      );

      return res.json({
        message: "Report generated successfully",
        pdfUrl,
      });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};