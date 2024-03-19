import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { USER_STATES } from "../context/authContext";
import { Layout } from "../containers/Layout/Layout";

export const Protected = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isLogin === USER_STATES.NOT_LOGGED && navigate("/login");
  }, [isLogin]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
