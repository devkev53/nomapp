import {RiKey2Fill, RiCloseCircleFill, RiSave3Fill, RiLockFill, RiLockUnlockFill} from 'react-icons/ri'
import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'
import { CustomInput } from '../ui/CustomInput'
import { PrimaryBtn } from '../ui/PrimaryBtn'
import { useRef, useState } from 'react'
import { changePass } from '../../services/users.service'
import {useAuth} from '../../hooks/useAuth'
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'


import './changePass.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

export const ChangePassModal = ({closeFn}) => {

  const [activateBtn, setActivateBtn] = useState(true)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isEmpty2, setIsEmpty2] = useState(true)
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowPass2, setIsShowPass2] = useState(false)

  const {user, updateUserData} = useAuth()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const formRef = useRef()
  const navigate = useNavigate()
  const mySwal = withReactContent(Swal)


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    fetchChangePassword(data)
  }

  const fetchChangePassword = async (data) => {
    try {
      let response = await callEndpoint(changePass(user?.id, data))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict()
    }
  }

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

  const endOk  = () => mySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate(0)
  })

  const endConflict = () => mySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible realizar el cambio de contraseña..!</p></div>
  })


  return (
    <div className="card_modal changePass_card animate__animated animate__bounceIn">
    {isLoading && <PageLoadingSpiner/>}

    <div className="title">
      <h3>
        <RiKey2Fill />
        <span>Cambiar Contraseña</span>
      </h3>
      <button onClick={closeFn} className="close_btn">
        <RiCloseCircleFill/>
      </button>
    </div>

    <div className="body">
      <form ref={formRef} onSubmit={handleSubmit}>

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
        
        
      <PrimaryBtn type="submit" state={activateBtn}>
        <RiSave3Fill />
        <span>Guardar</span>
      </PrimaryBtn>
      </form>
    </div>
    <div className="footer">
    </div>
  </div>
  )
}
