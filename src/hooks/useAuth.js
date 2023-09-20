import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { AuthContext, USER_STATES } from '../context/authContext'
import { loginService } from '../services/auth.service';

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
  },[])

  useEffect(() => {
    const getAuthData = JSON.parse(
      window.localStorage.getItem("authData")
    )
    setIsLogin(getAuthData)
  },[])
  
  const setLoginData = (data) => {
    setAuthData({token: data.token, refreshToken: data.refreshToken})
    setUserData(data.user)
  }

  const setAuthData = (data) => {
    window.localStorage.setItem('authData', JSON.stringify(data))
  }

  const setUserData = (data) => {
    window.localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const clearData = () => {
    window.localStorage.removeItem('userInfo')
    window.localStorage.removeItem('authData')
  }

  const handleLogin = async (data) => {
    try {
      const result = await loginService(data)
      setLoginData(result)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  const handleLogout = async () => {
    try {
      navigate('/login')
      clearData()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isLogin,
    user,
    setLoginData,
    clearData,
    handleLogin,
    handleLogout
  }
}