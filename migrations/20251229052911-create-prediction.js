/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Predictions", {
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

    cancer_stage: {
      type: Sequelize.STRING, // Stage I, II, III, IV
      allowNull: false,
    },

    confidence_score: {
      type: Sequelize.FLOAT,
    },

    prediction_source: {
      type: Sequelize.STRING, // clinical / imaging / hybrid
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
  await queryInterface.dropTable("Predictions");
}
