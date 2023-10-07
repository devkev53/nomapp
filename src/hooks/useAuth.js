import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext, USER_STATES } from "../context/authContext";
import { loginService, logoutService } from "../services/auth.service";
import {useFetchAndLoad} from '../hooks/useFetchAndLoad'

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useAuth = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext);
  const {isLoading, callEndpoint} = useFetchAndLoad()

  useEffect(() => {
    const getUser = JSON.parse(
      window.localStorage.getItem("userInfo") || USER_STATES.NOT_LOGGED
    );
    setUser(getUser);
  }, []);

  useEffect(() => {
    const getAuthData = JSON.parse(window.localStorage.getItem("authData"));
    setIsLogin(getAuthData);
  }, []);

  const setLoginData = (data) => {
    setAuthData({ token: data.token, refreshToken: data.refreshToken });
    setUserData(data.user);
  };

  const setAuthData = (data) => {
    window.localStorage.setItem("authData", JSON.stringify(data));
  };

  const setUserData = (data) => {
    window.localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const clearData = () => {
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("authData");
  };

  const handleLogin = async (data) => {
    try {
      const response = await callEndpoint(loginService(data));
      setLoginData(response.data);
      navigate("/");
    } catch (e) {
      if (e.response.status === 400) {
        MySwal.fire({
          title: "Oops..!",
          icon: "error",
          text: e.response.data.error,
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      navigate("/login");
      logoutService({ user: user.id });
      clearData();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isLogin,
    user,
    setLoginData,
    clearData,
    handleLogin,
    handleLogout,
    isLoading,
  };
};
