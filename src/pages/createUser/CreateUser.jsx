import './createUser.css'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import icon from '../../assets/img/payIcon.png'
import { RiUser3Fill, RiArrowDownSFill, RiSave3Fill, RiLockFill, RiLockUnlockFill } from "react-icons/ri";
import { useAuth } from '../../hooks/useAuth';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import {CustomInput} from '../../components/ui/CustomInput'
import { PrimaryBtn } from '../../components/ui/PrimaryBtn'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { createNewUser } from '../../services/users.service';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const CreateUser = () => {

  const [activateBtn, setActivateBtn] = useState(true)
  const [showProfileInfo, setShowProfileInfo] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isEmpty2, setIsEmpty2] = useState(true)
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowPass2, setIsShowPass2] = useState(false)

  const {isLogin} = useAuth()
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal)
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const formRef = useRef()



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
    fetchCreateUser(data)
  }

  const fetchCreateUser = async (data) => {
    try {
      let response = await callEndpoint(createNewUser(data))
      console.log(response)
      response.status === 201 && endOk()
    } catch (e) {
      endConflict()
    }
  }

  const endOk  = () => mySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate('/login')
  })

  const endConflict = () => mySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible realizar la creación del usuario..!</p></div>
  })


  useEffect(() => {
    isLogin && navigate('/')
  },[isLogin])


  return (
    <main className="main content_createUser font-sans bg-gradient-to-tr from-indigo-800 from-10% via-purple-500 to-pink-500 to-80%">
      {isLoading && <PageLoadingSpiner />}
      <div>
        {/* <picture className='icon_container bg-gray-50 rounded-full'>
          <img className='icon' src={icon} alt="" />
        </picture> */}
        <form ref={formRef} onSubmit={handleSubmit} action="" className="form_content_newUser rounded bg-gray-50">
          <h3 className='font-bold text-2xl'>
            <RiUser3Fill />
            Crear Usuario
          </h3>

          <div className="user_info">
            <div className="row">
              <CustomInput label="Usuario" name="username" required={true} />
              <CustomInput label="Correo Electronico" name="email" type="email" required={true}/>
            </div>

            <div className="row">

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
            </div>
          </div>

          <div className="profile_data" onClick={() => setShowProfileInfo(!showProfileInfo)}>
            <div className="title">
              <h3 className={`${showProfileInfo && 'showThis'}`}>Datos del Perfil <span><RiArrowDownSFill/></span></h3>
              <small>No son obligatorios</small>
            </div>

            <div className={`profileInfo ${showProfileInfo && 'showThis'}`}>
              <div className="row">
                <CustomInput label="Nombres" name="name" />
                <CustomInput label="Apellidos" name="last_name" />
              </div>
              <div className="row">
                <CustomInput label="Telefono" name="phone" />
                <CustomInput label="Dirección" name="address" />
              </div>
            </div>

          </div>


          <PrimaryBtn type="submit" state={activateBtn}>
            <RiSave3Fill />
            <span>Crear</span>
          </PrimaryBtn>
          <a href="/login" className='hover:text-teal-600'>
            Regresar al <span className='font-bold text-purple-700 hover:text-teal-700'>Login</span>
          </a>
        </form>
      </div>
    </main>
  )
}
