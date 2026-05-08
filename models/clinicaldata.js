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
      // NEW
      ajcc_pathologic_t: DataTypes.STRING,
      ajcc_staging_system_edition: DataTypes.STRING,
      ajcc_pathologic_m: DataTypes.STRING,
      ajcc_pathologic_n: DataTypes.STRING,
      days_to_last_follow_up: DataTypes.INTEGER,
      tumor_grade: DataTypes.STRING,
      ishak_fibrosis_score: DataTypes.STRING,
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