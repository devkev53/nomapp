import dayjs from "dayjs";
import {es} from "dayjs/locale/es"

export const chekFortnightPayment = () => {
  const date = new Date();
  let quincena = new Date(date.getFullYear(), date.getMonth(), 14);
  if (quincena.getDay() === 6) { // Sabado
    return quincena.getDate() - 1
  } else if (quincena.getDay() === 7) { // Domingo
    return quincena.getDate() - 2
  }
  return quincena
}

export const chekMonthlyPayment = () => {
  const date = new Date();
  let ultimoDia  = new Date(date.getFullYear(), date.getMonth() + 1, -3);
  if (ultimoDia.getDay() === 6) { // Sabado
    return ultimoDia.getDate() - 1
  } else if (ultimoDia.getDay() === 7) { // Domingo
    return ultimoDia.getDate() - 2
  }
  return ultimoDia   
}

export const restPayDays = () => {
  const date = new Date();
  const quincenaDay = chekFortnightPayment()
  const mesDay = chekMonthlyPayment()
  if (date.getDate() > quincenaDay & date.getDay < mesDay) {
    return mesDay - date.getDate() - 1
  } else {
    return quincenaDay - date.getDay() - 1
  }
}