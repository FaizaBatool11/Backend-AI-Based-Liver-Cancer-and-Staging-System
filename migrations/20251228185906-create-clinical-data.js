/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("clinical_data", {
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

    // 🔥 NEW FIELDS
    ajcc_pathologic_t: Sequelize.STRING,
    ajcc_staging_system_edition: Sequelize.STRING,
    ajcc_pathologic_m: Sequelize.STRING,
    ajcc_pathologic_n: Sequelize.STRING,

    days_to_last_follow_up: Sequelize.INTEGER,
    tumor_grade: Sequelize.STRING,
    ishak_fibrosis_score: Sequelize.STRING,

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
  await queryInterface.dropTable("clinical_data");
}