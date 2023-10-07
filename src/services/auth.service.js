import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

import { baseUrl } from "../utilitys/base-url.utils";

export const loginService = async (data) => {
  const response = await axiosPublicInstance.post(`${baseUrl}api/login/`, data);
  return response.data;
};

export const logoutService = async (data) => {
  const response = await axiosPublicInstance.post(
    `${baseUrl}api/logout/`,
    data
  );
  return response;
};

export const refreshTokenService = async (refreshToken) => {
  const response = await axiosPublicInstance.post(
    `${baseUrl}api/token/refresh/`,
    refreshToken
  );
  return response;
};
