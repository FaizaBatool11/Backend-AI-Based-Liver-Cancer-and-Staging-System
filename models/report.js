import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // 🔗 Each report belongs to one patient
      Report.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Report.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      predicted_stage: {
        type: DataTypes.STRING,
      },

      confidence: {
        type: DataTypes.FLOAT,
      },

      pdf_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Report",
      tableName: "Reports", // IMPORTANT (match migration table)
    }
  );

  return Report;
};