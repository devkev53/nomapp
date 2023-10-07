import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";

const baseUrl = "api/";
const companiesUrl = "api/companies/";

// export const getCompanies = async () => {
//   const response = await axiosPublicInstance.get(
//     `api/companies/`
//   );
//   return response.data;
// };

export const getCompanies = () => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(companiesUrl, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getCompanyEmployes = (id) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(`${companiesUrl}${id}/employees/`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getOneCompany = (id) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(`${companiesUrl}${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createCompany = async (data) => {
  const response = await axiosPrivateInstance.post(`api/companies/`, data);
  return response;
};

export const paymentNomina = (data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(`api/payment-nomina/`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getNominaPDF = (company_id, data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(
      `api/company_report_nomina/${company_id}/`,
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getDepartments = (data) => {
  let url = "";
  if (data === null || data === undefined) {
    url = "api/department/";
  } else {
    url = `api/department/?companyId=${data}`;
  }
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(url, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createDepartments = (data) => {
  let url = "api/department/";
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(url, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPositions = (data) => {
  let url = "api/positions/";
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(url, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createPositions = (data) => {
  let url = "api/positions/";
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(url, data, {
      signal: controller.signal,
    }),
    controller,
  };
};
