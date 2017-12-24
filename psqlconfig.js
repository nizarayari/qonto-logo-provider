require('dotenv').config();

const config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
};
module.exports = {
  development: config,
  staging: config,
  production: config,
};
