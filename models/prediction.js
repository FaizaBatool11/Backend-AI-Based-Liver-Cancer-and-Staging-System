import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Prediction extends Model {
    static associate(models) {
      Prediction.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
      });
    }
  }

  Prediction.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cancer_stage: DataTypes.STRING,
      confidence_score: DataTypes.FLOAT,
      prediction_source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prediction",
      tableName: "Predictions",
    }
  );

  return Prediction;
};
