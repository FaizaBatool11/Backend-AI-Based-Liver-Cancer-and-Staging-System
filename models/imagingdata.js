import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ImagingData extends Model {
    static associate(models) {
      ImagingData.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
      });
    }
  }

  ImagingData.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scan_type: DataTypes.STRING,
      image_path: DataTypes.STRING,
      image_format: DataTypes.STRING,
      tumor_size: DataTypes.FLOAT,
      tumor_stage: DataTypes.STRING,
      vascular_invasion: DataTypes.BOOLEAN,
      metastasis: DataTypes.BOOLEAN,
      scan_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ImagingData",
      tableName: "ImagingData",
    }
  );

  return ImagingData;
};
