/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("ClinicalData", {
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

    age_at_index: Sequelize.INTEGER,
    bmi: Sequelize.FLOAT,
    tumor_nodul: Sequelize.INTEGER,
    hepatitis: Sequelize.BOOLEAN,
    afp: Sequelize.FLOAT,
    afp_group: Sequelize.INTEGER,
    alk: Sequelize.FLOAT,
    days_to_last_follow_up: Sequelize.INTEGER,
    metastasis: Sequelize.BOOLEAN,

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
  await queryInterface.dropTable("ClinicalData");
}
