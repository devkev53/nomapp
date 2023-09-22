import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";

const baseUrl = 'api/';

export const loginService = async (data) => {
  const response = await axiosPublicInstance.post(`http://localhost:8000/api/login/`, data);
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosPrivateInstance.post(`http://localhost:8000/api/logout/`);
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
