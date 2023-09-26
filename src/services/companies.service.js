import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import {loadAbort} from '../utilitys/load-abort-axios.utility'

const baseUrl = "api/";
const companiesUrl = 'http://localhost:8000/api/companies/'

// export const getCompanies = async () => {
//   const response = await axiosPublicInstance.get(
//     `http://localhost:8000/api/companies/`
//   );
//   return response.data;
// };

export const getCompanies = () => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.get(companiesUrl, {signarl: controller.signal}), 
    controller}
}

export const getOneCompany = async (id) => {
  const response = await axiosPublicInstance.get(
    `http://localhost:8000/api/companies/${id}`
  );
  return response.data;
};

export const createCompany = async (data) => {
  const response = await axiosPrivateInstance.post(
    `http://localhost:8000/api/companies/`,
    data
  );
  return response.data;
};
