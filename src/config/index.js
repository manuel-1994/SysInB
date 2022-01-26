require('dotenv').config();

const config = {
  dev: process.env.MODE === 'dev',
  test: process.env.MODE === 'test',
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGODB_URI,
};

module.exports = config;