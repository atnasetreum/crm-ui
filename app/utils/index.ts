import * as CryptoJS from "crypto-js";

export const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const encryptPassword = (password: string) =>
  CryptoJS.AES.encrypt(password, "ee825e8b544c44575e0645c9d9c21cd7").toString();
