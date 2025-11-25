// import dotenv from "dotenv";
// dotenv.config();

// import { Sequelize } from "sequelize";

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

// export default db;

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import UserModel from "./user.js";   // 👈 import your User model here

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: console.log, // optional: shows SQL queries in console
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ initialize models
db.User = UserModel(sequelize, Sequelize.DataTypes);

export default db;
