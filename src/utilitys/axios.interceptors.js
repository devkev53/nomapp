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
  axiosPrivateInstance.interceptors.request.use(async (request) => {
    const { token, refreshToken } = getAuthTokens();

    // UPDATE HEADER FOR REPORT DOCUMENTS PDF
    const updateTypeReportHeader = (request) => {
      const pdfHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        // "Content-Disposition": "inline; report.pdf"
      };
      request.responseType = "blob";
      request.headers = pdfHeaders;
      return request;
    };

    // UPDATE HEADER FOR POST WITH JSON
    const updateJsonHeader = (request) => {
      const jsonHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      request.headers = jsonHeader;
      return request;
    };

    if (request.url?.includes("report")) return updateTypeReportHeader(request);
    if (request.url?.includes("sales")) return updateJsonHeader(request);

    request = updateHeader(request);

    if (token) {
      if (!tokenValidate(token)) return request;
      if (refreshValidate(refreshToken)) {
        clearAuthData();
      }

      const response = await refreshTokenService({ refresh: refreshToken });
      const { access, refresh } = response.data;

      const data = { token: access, refreshToken: refresh };
      updateAuthData(data);

      request.headers.Authorization = `Bearer ${response.data.access}`;
    }

    return request;
  });

  axiosPrivateInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
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
      return Promise.reject(error);
    }
  );
};
