/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("imaging_data", {
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
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    scan_type: {
      type: Sequelize.STRING,
      allowNull: false, // CT / MRI
    },

    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    public_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },

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