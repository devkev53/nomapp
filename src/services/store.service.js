import axios from "axios";
import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";

const salesUrl = "http://127.0.0.1:8000/api/sales/";

export const createSale = async (data) => {
  const response = await axiosPrivateInstance.post(
    `${salesUrl}`,
    data
  );
  return response.data;
};
