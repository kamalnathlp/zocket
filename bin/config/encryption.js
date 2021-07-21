import { AES, enc } from 'crypto-js';
import config from './config.js';

const encrypt = (plain) => {
  return AES.encrypt(plain, config.aes.key).toString();
};

const decrypt = (encrypted) => {
  return AES.decrypt(encrypted, '123456789').toString(enc.Utf8);
};

export default {
  encrypt,
  decrypt,
};
