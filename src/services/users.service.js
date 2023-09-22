import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

const baseUrl = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  const response = await axiosPrivateInstance(`${baseUrl}users`);
  return response.data;
};

export const getOneUser = async (id) => {
  const response = await axiosPrivateInstance(`${baseUrl}users/${id}`);
  return response.data;
};
