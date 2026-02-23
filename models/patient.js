import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // Patient belongs to a doctor (User)
      Patient.belongsTo(models.User, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
      Patient.hasOne(models.ClinicalData, {
        foreignKey: "patient_id",
        as: "clinical",
      });
      Patient.hasMany(models.ImagingData, {
        foreignKey: "patient_id",
        as: "imaging",
      });
      Patient.hasMany(models.Prediction, {
        foreignKey: "patient_id",
        as: "predictions",
      });
    }
  }

  Patient.init(
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING,
      contact: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Patient",
      tableName: "patients",
    }
  );

  return Patient;
};
