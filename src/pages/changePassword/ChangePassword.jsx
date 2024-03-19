import './changePassword.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import icon from '../../assets/img/payIcon.png'
import { RiKey2Fill, RiKeyFill, RiLockFill, RiLockUnlockFill, RiMailCheckFill } from "react-icons/ri";
import { useAuth } from '../../hooks/useAuth';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import {CustomInput} from '../../components/ui/CustomInput'
import {PrimaryBtn} from '../../components/ui/PrimaryBtn'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { changePasswodByToken } from '../../services/users.service';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';

const mySwal = withReactContent(Swal)


export const ChangePassword = () => {

  const [activateBtn, setActivateBtn] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isEmpty2, setIsEmpty2] = useState(true)
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowPass2, setIsShowPass2] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const formRef = useRef()
  const navigate = useNavigate()
  const params = useParams()
  const mySwal = withReactContent(Swal)
  const {isLogin} = useAuth()

  const handleOnBlur = () => {
    const info = document.querySelector('.passInfo')
    const data = new FormData(formRef.current)
    const pass = data.get('password')
    const pass2 = data.get('password2')
    pass === pass2 ? setActivateBtn(false) : setActivateBtn(true)
    pass === '' && setActivateBtn(true)
    pass2 === '' && setActivateBtn(true)
  }

  const handleCheck = (e) => {
    if (e.target.value === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }
  const handleCheck2 = (e) => {
    if (e.target.value === "") {
      setIsEmpty2(true)
    } else {
      setIsEmpty2(false)
    }
  }

  const changeType = () => {
    setIsShowPass(!isShowPass)
  }
  const changeType2 = () => {
    setIsShowPass2(!isShowPass2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    fetchSendMailReset(data)
  }

  const fetchSendMailReset = async(data) => {
    try {
      let response = await callEndpoint(changePasswodByToken(params.token, data))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict(e.message)
    }
  }

  const endOk  = () => mySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate('/login')
  })

  const endConflict = (e) => mySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    text: e
  })


  useEffect(() => {
    isLogin && navigate('/login')
  },[isLogin])


  return (
    <main className="main reset_password font-sans bg-gradient-to-tr from-indigo-800 from-10% via-purple-500 to-pink-500 to-80%">
      {isLoading && <PageLoadingSpiner />}
      <div>
        {/* <picture className='icon_container bg-gray-50 rounded-full'>
          <img className='icon' src={icon} alt="" />
        </picture> */}
        <form ref={formRef} onSubmit={handleSubmit} action="" className="form_content rounded justify-center bg-gray-50">
          
          <h3 className='font-bold text-2xl'>
            <RiKey2Fill/>
            Cambiar la Contraseña
          </h3>
          
          <div className={`input_group2 ${!isEmpty && "no_empty"}`}>
            <input
              onBlur={handleOnBlur} 
              id='password' 
              onChange={handleCheck} 
              name='password' 
              type={`${isShowPass ? 'text' : 'password'}`} 
              required 
            />
            <label className="input_group2__label">Nueva Contraseña</label>
            <span type='button' onFocus={(e) => {e.target.blur()}} onClick={changeType}>
              {isShowPass 
                ? <RiLockUnlockFill/>
                : <RiLockFill/>
              }
            </span>
            <div className="input_group2__underline"></div>
          </div>

          <div className={`input_group2 ${!isEmpty2 && "no_empty"}`}>
            <input
              onBlur={handleOnBlur} 
              id='password2' 
              onChange={handleCheck2} 
              name='password2' 
              type={`${isShowPass2 ? 'text' : 'password'}`} 
              required 
            />
            <label className="input_group2__label">Repetir Contraseña</label>
            <span type='button' onFocus={(e) => {e.target.blur()}} onClick={changeType2}>
              {isShowPass2 
                ? <RiLockUnlockFill/>
                : <RiLockFill/>
              }
            </span>
            <div className="input_group2__underline"></div>
          </div>
          
          <PrimaryBtn state={activateBtn} label="Enviar">
            <RiMailCheckFill/>
          </PrimaryBtn>
          <a href="/login" className='hover:text-teal-600'>
            Regresar al <span className='font-bold text-purple-700 hover:text-teal-700'>Login</span>
          </a>
        </form>
      </div>
    </main>
  )
}
