require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
};

module.exports = config;