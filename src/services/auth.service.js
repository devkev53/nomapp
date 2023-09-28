import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

const baseUrl = "api/";

export const loginService = async (data) => {
  const response = await axiosPublicInstance.post(
    `http://127.0.0.1:8000/api/login/`,
    data
  );
  return response.data;
};

export const logoutService = async (data) => {
  const response = await axiosPublicInstance.post(
    `http://127.0.0.1:8000/api/logout/`,
    data
  );
  return response
};

export const refreshTokenService = async (refreshToken) => {
  const response = await axiosPublicInstance.post(
    `http://127.0.0.1:8000/api/token/refresh/`,
    refreshToken
  );
  return response
};
