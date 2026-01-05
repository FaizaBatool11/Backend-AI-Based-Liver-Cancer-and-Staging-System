// // import dotenv from "dotenv";
// // dotenv.config();

// // import { Sequelize } from "sequelize";

// // // Create Sequelize instance
// // const sequelize = new Sequelize(
// //   process.env.DB_NAME,
// //   process.env.DB_USER,
// //   process.env.DB_PASSWORD,
// //   {
// //     host: process.env.DB_HOST || "localhost",
// //     dialect: "mysql",
// //     port: process.env.DB_PORT || 3306,
// //     logging: console.log, // optional: shows SQL queries in console
// //   }
// // );

// // const db = {};
// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;

// // export default db;

// import dotenv from "dotenv";
// dotenv.config();

// import { Sequelize } from "sequelize";
// import UserModel from "./user.js"; 
//   // 👈 import your User model here
// import PatientModel from "./patient.js";
// import ClinicalDataModel from "./clinicaldata.js";
// import ImagingDataModel from "./imagingdata.js"; // ✅ add this
// // Create Sequelize instance
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//     port: process.env.DB_PORT || 3306,
//     logging: console.log, // optional: shows SQL queries in console
//   }
// );

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // ✅ initialize models
// db.User = UserModel(sequelize, Sequelize.DataTypes);
// db.Patient = PatientModel(sequelize, Sequelize.DataTypes);
// db.ClinicalData = ClinicalDataModel(sequelize, Sequelize.DataTypes);
// db.ImagingData = ImagingDataModel(sequelize, Sequelize.DataTypes); // ✅

// Object.values(db).forEach(model => {
//   if (model.associate) {
//     model.associate(db);
//   }
// });

// export default db;

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import UserModel from "./user.js";
import PatientModel from "./patient.js";
import ClinicalDataModel from "./clinicaldata.js";
import ImagingDataModel from "./imagingdata.js"; // ✅ import correctly
import PredictionModel from "./prediction.js"; // ✅ import

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: console.log,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize all models first
db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Patient = PatientModel(sequelize, Sequelize.DataTypes);
db.ClinicalData = ClinicalDataModel(sequelize, Sequelize.DataTypes);
db.ImagingData = ImagingDataModel(sequelize, Sequelize.DataTypes); // ✅ initialize
db.Prediction = PredictionModel(sequelize, Sequelize.DataTypes); // ✅ initialize

// Run associations **after all models are initialized**
Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

export default db;
