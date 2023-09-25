import axios from "axios";
import { getAuthTokens } from "./localStorage.utility";

const baseUrl = "http://127.0.0.1:8000/";

export const axiosPrivateInstance = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPublicInstance = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateMultiparFormData = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export const updateHeader = (request) => {
  const { token } = getAuthTokens();
  const newHeaders = {
    Accept: "applicacion/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "apllication/json",
  };
  request.headers = newHeaders;
  return request;
};
