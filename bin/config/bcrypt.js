import bcrypt from 'bcrypt';
import config from './config.js';

const generateHash = async (unhashed) => {
  return await bcrypt.hash(unhashed, config.bcrypt.salt);
};

const compareHash = async (plainText, hash) => {
  return await bcrypt.compare(plainText, hash);
};

export { generateHash, compareHash };
