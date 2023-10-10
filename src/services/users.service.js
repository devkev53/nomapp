import {
  axiosPrivateInstance,
  axiosPublicInstance,
} from "../utilitys/axios-instances";
import { loadAbort } from "../utilitys/load-abort-axios.utility";
import { baseUrl } from "../utilitys/base-url.utils";

export const getUsers = async () => {
  const response = await axiosPrivateInstance(`${baseUrl}users`);
  return response.data;
};

export const getOneUser = (id) => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.get(`${baseUrl}api/users/${id}/`, {
      signal: controller.signal,
    }),
    controller
  }
};

export const createNewUser = (data) => {
  const controller = loadAbort()
  return {
    call: axiosPublicInstance.post(`${baseUrl}api/users/`, 
    data, {
      signal: controller.signal,
    }),
    controller
  }
};

export const updateUser = (id, data) => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.put(`${baseUrl}api/users/${id}/`, data, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const changePass = (id, data) => {
  const controller = loadAbort()
  return {
    call: axiosPrivateInstance.post(`${baseUrl}api/users/${id}/change_password/`, data, {
      signal: controller.signal,
    }),
    controller,
  }
}


export const sendMailResetPass = (data) => {
  const controller = loadAbort()
  return {
    call: axiosPublicInstance.post(`${baseUrl}api/reset-password`, data, {
      signal: controller.signal,
    }),
    controller
  }
}


export const changePasswodByToken = (token,data) => {
  const controller = loadAbort()
  return {
    call: axiosPublicInstance.put(`${baseUrl}api/change-password/${token}`, data, {
      signal: controller.signal,
    }),
    controller
  }
}
