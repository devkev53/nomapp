import axios from "axios";
import { logoutService, refreshTokenService } from "../services/auth.service";
import {
  axiosPrivateInstance,
  axiosPrivateMultiparFormData,
  axiosPublicInstance,
  updateHeader,
} from "./axios-instances";
import {
  getAuthTokens,
  clearAuthData,
  updateAuthData,
  getLocalUserInfo,
} from "./localStorage.utility";
import { tokenValidate, refreshValidate } from "./token-validations.utility";

export const PrivateInterceptor = () => {

  axiosPrivateInstance.interceptors.request.use( async (request) => {

      const { token, refreshToken } = getAuthTokens();
      // console.log(token, refreshToken);

      request = updateHeader(request);

      if (token) {
        if (!tokenValidate(token)) return request;
        if (refreshValidate(refreshToken)) {
          // const { id } = getLocalUserInfo();
          logoutService({ user: id });
          clearAuthData();
        }
        // console.log({ refresh: refreshToken });
        const response = await refreshTokenService({ refresh: refreshToken });
        const { access, refresh } = response.data;
        console.log(' -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')
        console.log(response)
        console.log(' -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')
        const data = { token: access, refreshToken: refresh };
        updateAuthData(data);

        request.headers.Authorization = `Bearer ${response.data.access}`;
      }
      console.log(request);
      return request;
    }
  );
  axiosPrivateInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error);
      // throw new Error(error);
      return Promise.reject(error);
    }
  );
};

export const PublicInterceptor = () => {
  axiosPublicInstance.interceptors.request.use(async (request) => {
    return request;
  });
  axiosPublicInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error);
      // console.error(error.response.data.error);
      return Promise.reject(error);
    }
  );
};
