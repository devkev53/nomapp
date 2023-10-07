import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

const employeesUrl = `${baseUrl}api/employees/`;

export const getEmployees = () => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(employeesUrl, { signal: controller.signal }),
    controller,
  };
};

export const getEmployeesFilter = (companyID) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(
      `${baseUrl}api/employees-filter/?companyId=${companyID}`,
      { signal: controller.signal }
    ),
    controller,
  };
};

export const getOneEmployee = (id) => {
  const controller = loadAbort();
  return {
    call: axiosPublicInstance.get(`${baseUrl}api/employees/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addEmployee = (data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(`${baseUrl}api/employees/`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const checkPayments = (employee, querys) => {
  const url = `${baseUrl}api/check-payment/${employee}/?${querys}`;
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(url, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const downloadTicket = (type, id) => {
  const url = `${baseUrl}api/payment-ticket-pdf/${id}/?type=${type}`;
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(url, {
      signal: controller.signal,
    }),
    controller,
  };
};
