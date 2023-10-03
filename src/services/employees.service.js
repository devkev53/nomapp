import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import {loadAbort} from '../utilitys/load-abort-axios.utility'

const baseUrl = "api/";
const employeesUrl = 'http://localhost:8000/api/employees/'

export const getEmployes = () => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.get(employeesUrl, {signal: controller.signal}),
    controller
  }
};

export const getEmployesFilter = (data) => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.get('http://localhost:8000/api/employees-filter/', data, {signal: controller.signal}),
    controller
  }
};

export const getOneEmploye = async (id) => {
  const response = await axiosPublicInstance.get(
    `http://localhost:8000/api/employees/${id}`
  );
  return response.data;
};
