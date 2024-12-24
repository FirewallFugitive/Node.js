const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize with .env variables
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Database name
    process.env.DB_USER,       // Database user
    process.env.DB_PASSWORD,   // Database password
    {
        host: process.env.DB_HOST,  // Database host
        dialect: 'mysql',           // Database dialect
        port: process.env.DB_PORT   // Database port
    }
);

module.exports = sequelize;

