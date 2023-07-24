require('dotenv').config();

const {
  PORT = 3000,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  SALT_LENGTH = 10,
  FRONTEND_ORIGIN_DOMAIN,
} = process.env;

module.exports = {
  PORT,
  DB_URL:
    NODE_ENV !== 'production' ? 'mongodb://127.0.0.1:27017/bitfilmsdb' : DB_URL,
  JWT_SECRET:
    NODE_ENV !== 'production' ? 'super-duper-dev-key' : JWT_SECRET,
  SALT_LENGTH,
  FRONTEND_ORIGIN_DOMAIN:
    NODE_ENV !== 'production' ? 'localhost:3001' : FRONTEND_ORIGIN_DOMAIN,
};
