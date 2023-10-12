import dayjs from "dayjs";
import { es } from "dayjs/locale/es";

export const chekFortnightPayment = () => {
  const date = new Date();
  let quincena = new Date(date.getFullYear(), date.getMonth(), 14);
  if (quincena.getDay() === 6) {
    // Sabado
    return quincena.getDate() - 1;
  } else if (quincena.getDay() === 7) {
    // Domingo
    return quincena.getDate() - 2;
  }
  return quincena;
};

export const chekMonthlyPayment = () => {
  const date = new Date();
  let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, -3);
  if (ultimoDia.getDay() === 6) {
    // Sabado
    return ultimoDia.getDate() - 1;
  } else if (ultimoDia.getDay() === 7) {
    // Domingo
    return ultimoDia.getDate() - 2;
  }
  return ultimoDia;
};

export const restPayDays = () => {
  let date = new Date();
  let today = date.getDate();
  let lastday = new Date(date.getFullYear(), date.getMonth() + 1, -3);
  let fortnight = chekFortnightPayment();
  let monthly = chekMonthlyPayment();
  if (today > fortnight && today < lastday) {
    // console.log("entro en Pago Mensual");
    return monthly - today;
  } else if (today > monthly && today < lastday) {
    // console.log("entro en el Primero - Pago de Quincena");
    return fortnight + (lastday - today);
  } else {
    // console.log("entro en el ultimo - Pago de Quincena");
    return fortnight - today;
  }
};
