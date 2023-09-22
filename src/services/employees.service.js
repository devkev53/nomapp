import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

const baseUrl = 'api/';

export const getEmployes = async () => {
  const response = await axiosPublicInstance.get(`http://localhost:8000/api/employees/`);
  return response.data
}

