import './resetPassword.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import icon from '../../assets/img/payIcon.png'
import { RiUser3Fill, RiKeyFill, RiLockFill, RiLockUnlockFill, RiMailCheckFill } from "react-icons/ri";
import { useAuth } from '../../hooks/useAuth';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import {CustomInput} from '../../components/ui/CustomInput'
import {PrimaryBtn} from '../../components/ui/PrimaryBtn'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';
import { sendMailResetPass } from '../../services/users.service';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)


export const ResetPassword = () => {

  const [isShowPass, setIsShowPass] = useState(false)

  const {isLogin} = useAuth()
  const navigate = useNavigate()

  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    // url_token = generate_url_token(data.get('email'))
    // data.append('token', url_token)
    fetchSendMailReset(data)
  }

  const fetchSendMailReset = async(data) => {
    try {
      let response = await callEndpoint(sendMailResetPass(data))
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
        <picture className='icon_container bg-gray-50 rounded-full'>
          <img className='icon' src={icon} alt="" />
        </picture>
        <form ref={formRef} onSubmit={handleSubmit} action="" className="form_content rounded justify-center bg-gray-50">
          
          <h3 className='font-bold text-2xl'>
            <RiMailCheckFill/>
            Resetear Contraseña
          </h3>
          <small>Para el reseteo de la contraseña favor ingrese su correo electronico..!</small>
          {/* <CustomInput required={true} name="username" label="Usuario"/> */}
          <CustomInput required={true} name="email" label="Correo" type="email"/>
          
          <PrimaryBtn label="Enviar">
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
