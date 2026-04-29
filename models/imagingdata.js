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

      scan_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      public_id: {
        type: DataTypes.STRING,
        allowNull: true, // ✅ FIXED
      },
    },
    {
      sequelize,
      modelName: "ImagingData",
      tableName: "imaging_data",
      timestamps: true, // ✅ handles createdAt + updatedAt automatically
    }
  );

  return ImagingData;
};