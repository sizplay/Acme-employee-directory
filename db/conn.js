const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/acme_employee_directory';
const conn = new Sequelize(DATABASE_URL, {
  logging: false
});

module.exports = conn;
