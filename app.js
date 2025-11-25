import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS setup for frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

// Test DB connection
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ MySQL connected successfully");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

// Simple test route
// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
