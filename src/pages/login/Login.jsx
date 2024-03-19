import './login.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import icon from '../../assets/img/payIcon.png'
import { RiUser3Fill, RiKeyFill, RiLockFill, RiLockUnlockFill } from "react-icons/ri";
import { useAuth } from '../../hooks/useAuth';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'

export const Login = () => {

  const [isShowPass, setIsShowPass] = useState(false)

  const {handleLogin, isLogin, isLoading} = useAuth()
  const navigate = useNavigate()

  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    handleLogin(data)
    console.log(data)
  }

  const handleShowPass = () => {
    setIsShowPass(!isShowPass)
  }

  useEffect(() => {
    isLogin && navigate('/')
  },[isLogin])


  return (
    <main className="main font-sans bg-gradient-to-tr from-indigo-800 from-10% via-purple-500 to-pink-500 to-80%">
      {isLoading && <PageLoadingSpiner />}
      <div>
        <picture className='icon_container bg-gray-50 rounded-full'>
          <img className='icon' src={icon} alt="" />
        </picture>
        <form ref={formRef} onSubmit={handleSubmit} action="" className="form_content rounded justify-center bg-gray-50">
          <h3 className='font-bold text-2xl'>Iniciar Sesión</h3>
          <div className="input_group">
            <input type="text" name='username' required />
            <label className='input_group__label' htmlFor="">
              <RiUser3Fill />
              Usuario
            </label>
            <div className="input_group__underline"></div>
          </div>
          <div className="input_group">
            <input type={`${isShowPass ? 'text' : 'password'}`} name='password' required />
            <label className='input_group__label' htmlFor="">
              <RiKeyFill />
              Contraseña
            </label>
            <div className="input_group__underline"></div>
            <button type='button' onClick={handleShowPass} className="showPass">
              { isShowPass 
                ? (<RiLockUnlockFill/>)
                : (<RiLockFill/>)
              }
            </button>
          </div>
          <button className='primary_btn bg-yellow-500 w-full rounded py-2 hover:bg-yellow-400 font-bold'>Ingresar</button>
          <a href="/reset-password" className='hover:text-teal-600'>Recuperar Contraseña</a>
          <a 
            href="/create-user" 
            className='text-purple-600 font-bold hover:text-teal-500'
          >
            Crear Usuario
          </a>
        </form>
      </div>
    </main>
  )
}
