const { Sequelize } = require("sequelize");

// Database connection
const sequelize = new Sequelize("postgres", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Disable logging SQL queries
});

module.exports = sequelize;
