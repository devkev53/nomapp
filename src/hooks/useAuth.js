import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { AuthContext, USER_STATES } from '../context/authContext'

export const useAuth = () => {

  const navigate = useNavigate()
  const { 
    isLogin, setIsLogin,
    user, setUser 
  } = useContext(AuthContext)

  useEffect(() => {
    const getUser = JSON.parse(
      window.localStorage.getItem("userInfo") || USER_STATES.NOT_LOGGED
    )
    setUser(getUser)
    setIsLogin(getUser)
  },[])

  return {
    isLogin,
    user
  }
}