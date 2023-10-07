import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";

const baseUrl = "api/family-members/";

export const getFamilyMembers = () => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(baseUrl, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createFamilyMembers = (data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(baseUrl, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteFamilyMembers = (id) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.delete(`${baseUrl}${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
