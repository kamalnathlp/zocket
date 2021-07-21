require('dotenv').config();

const bcrypt = {
  salt: Number(process.env.BCRYPT_SALT),
};

const sequelize = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: process.env.DB_POOL_MAX,
    min: process.env.DB_POOL_MIN,
    ideal: Number(process.env.DB_POOL_IDEALTIME),
  },
};

const aes = {
  key: process.env.AES_KEY,
};

export { bcrypt, sequelize, aes };
