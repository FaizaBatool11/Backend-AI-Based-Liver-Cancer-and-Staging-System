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
      age_at_index: DataTypes.INTEGER,
      bmi: DataTypes.FLOAT,
      tumor_nodul: DataTypes.INTEGER,
      hepatitis: DataTypes.BOOLEAN,
      afp: DataTypes.FLOAT,
      afp_group: DataTypes.INTEGER,
      alk: DataTypes.FLOAT,
      days_to_last_follow_up: DataTypes.INTEGER,
      metastasis: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ClinicalData",
      tableName: "ClinicalData",
    }
  );

  return ClinicalData;
};
