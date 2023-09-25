export const getAuthTokens = () => {
  const tokens = window.localStorage.getItem("authData") || null;
  let authTokens = null;
  tokens !== null && (authTokens = JSON.parse(tokens));
  if (authTokens !== null) {
    const { token, refreshToken } = authTokens;
    return { token, refreshToken };
  } else {
    return { token: "", refreshToken: "" };
  }
};

export const clearAuthData = () => {
  window.localStorage.removeItem("userInfo");
  window.localStorage.removeItem("authData");
};

export const updateAuthData = (data) => {
  window.localStorage.setItem("authData", JSON.stringify(data));
};

export const getLocalUserInfo = (data) => {
  return window.localStorage.setItem("userInfo", JSON.stringify(data));
};
