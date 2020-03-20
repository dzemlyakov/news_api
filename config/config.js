require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-console
console.log({ isProduction });

module.exports = {
  PORT: 3000,
  JWT_SECRET: isProduction ? process.env.JWT_SECRET : 'dev-secret',
  DATABASE_URL: 'mongodb://localhost:27017/newsdb',
};
