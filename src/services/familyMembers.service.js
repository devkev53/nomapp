import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

const url = `${baseUrl}api/family-members/`;

export const getFamilyMembers = (employeId) => {
  let customUrl = `${url}${employeId}/for_employe/`;
  console.log(customUrl);
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.get(customUrl, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createFamilyMembers = (data) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.post(url, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteFamilyMembers = (id) => {
  const controller = loadAbort();
  return {
    call: axiosPrivateInstance.delete(`${url}${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
