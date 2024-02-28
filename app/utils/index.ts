import * as CryptoJS from "crypto-js";
import { toast } from "sonner";
import moment from "moment";

import "moment/locale/es";

export const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const encryptPassword = (password: string) =>
  CryptoJS.AES.encrypt(
    password,
    process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || ""
  ).toString();

export const notify = (message: string, success?: boolean) => {
  if (success) {
    toast.success("¡ Correcto !", {
      description: message,
    });
  } else {
    toast.error("¡ Atención !", {
      description: message,
    });
  }
};

export const stringToDateWithTime = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY h:mm a");

export const durantionToTime = (startTime: Date, end: Date) => {
  const duration = moment.duration(moment(end).diff(moment(startTime)));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours ? hours + "h" : ""} ${minutes ? minutes + "m" : ""} ${
    seconds ? seconds + "s" : ""
  }`;
};
