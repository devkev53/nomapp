import axios from "axios";
import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

const baseUrl = process.env.REACT_APP_API_URL;

export const loginService = async (data) => {
  console.log(`${baseUrl}login/`);
  const response = await axiosPublicInstance.post(`${baseUrl}login/`, data);
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosPrivateInstance.post(`${baseUrl}logout/`);
};

export const refreshTokenService = async (refreshToken) => {
  const controller = loadAbort();
  return {
    call: axiosPublicInstance.post(`${baseUrl}login`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};
