import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

export const loginService = (data) => {
  const controller = loadAbort()
  return {
    call: axiosPublicInstance.post(`${baseUrl}api/login/`, data, {
      signal: controller.signal,
    }),
    controller,
  }
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
