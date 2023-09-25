import {
  axiosPrivateInstance,
  axiosPublicInstance,
  axiosPrivateMultiparFormData,
} from "../utilitys/axios-instances";

const baseUrl = "api/";

export const getCompanies = async () => {
  const response = await axiosPublicInstance.get(
    `http://localhost:8000/api/companies/`
  );
  return response.data;
};

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
