import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";

const baseUrl = "api/";
const companiesUrl = "http://127.0.0.1:8000/api/companies/";

// export const getCompanies = async () => {
//   const response = await axiosPublicInstance.get(
//     `http://localhost:8000/api/companies/`
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
  const response = await axiosPrivateInstance.post(
    `http://localhost:8000/api/companies/`,
    data
  );
  return response.data;
};

export const paymentNomina = (company_id) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(
      `http://localhost:8000/api/company/${company_id}/pay-nomina`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getNominaPDF = (company_id, data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(
      `http://localhost:8000/api/company_report_nomina/${company_id}/`,
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
