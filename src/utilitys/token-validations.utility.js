import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export const tokenValidate = (token) => {
  const { exp } = jwtDecode(token);
  const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
  return isExpired;
};

export const refreshValidate = (refreshToken) => {
  const { exp } = jwtDecode(refreshToken);
  const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
  return isExpired;
};
