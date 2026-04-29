import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ClinicalData extends Model {
    static associate(models) {
      ClinicalData.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
      });
    }
  }

  ClinicalData.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
      },

      gender: {
        type: DataTypes.STRING,
      },

      race: {
        type: DataTypes.STRING,
      },

      ethnicity: {
        type: DataTypes.STRING,
      },

      vital_status: {
        type: DataTypes.STRING,
      },

      days_to_birth: {
        type: DataTypes.INTEGER,
      },

      primary_diagnosis: {
        type: DataTypes.STRING,
      },

      morphology: {
        type: DataTypes.STRING,
      },

      prior_malignancy: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "ClinicalData",
      tableName: "clinical_data",
      timestamps: true,
    }
  );

  return ClinicalData;
};