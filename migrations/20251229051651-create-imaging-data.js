/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("ImagingData", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    patient_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Patients",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    scan_type: {
      type: Sequelize.STRING, // CT / MRI
      allowNull: false,
    },

    image_path: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    image_format: {
      type: Sequelize.STRING,
    },

    tumor_size: Sequelize.FLOAT,
    tumor_stage: Sequelize.STRING,
    vascular_invasion: Sequelize.BOOLEAN,
    metastasis: Sequelize.BOOLEAN,

    scan_date: Sequelize.DATE,

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("ImagingData");
}
