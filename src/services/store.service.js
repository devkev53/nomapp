import axios from "axios";
import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { getAuthTokens } from "../utilitys/localStorage.utility";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

const salesUrl = `${baseUrl}api/sales/`;

export const createSale = async (data) => {
  const response = axiosPrivateInstance.post(`${salesUrl}`, data);
  return response.data;
};
