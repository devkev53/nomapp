import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

const productssUrl = `${baseUrl}api/products/`;

export const getProducts = () => {
  const controller = loadAbort();
  return {
    call: axiosPublicInstance.get(productssUrl, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const addProduct = (data) => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.post(productssUrl, data, {
      signal:controller.signal,
    }),
    controller
  }
}