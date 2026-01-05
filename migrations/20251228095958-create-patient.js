/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Patients", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    doctor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // must match Users table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
    },

    contact: {
      type: Sequelize.STRING,
    },

    gender: {
      type: Sequelize.STRING,
    },

    age: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable("Patients");
}
