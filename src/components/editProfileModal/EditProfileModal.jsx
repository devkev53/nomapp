import { RiCreativeCommonsByFill,RiShieldUserFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {CustomInput} from '../ui/CustomInput'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { PrimaryBtn } from "../../components/ui/PrimaryBtn"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import { CustomImageInput } from "../ui/CustomImageInput";
import {useAuth} from '../../hooks/useAuth'
import { updateUser } from "../../services/users.service";


import './editProfileModal.css'
import { CustomEditImagenInput } from "../ui/CustomEditImagenInput";

export const EditProfileModal = ({closeFn}) => {

  const {user, updateUserData} = useAuth()

  const [img, setImg] = useState(user?.image)
  const [preview, setPreview] = useState(user?.url_img)
  const [name, setName] = useState(user?.name)
  const [last_name, setLast_Name] = useState(user?.last_name)
  const [phone, setPhone] = useState(user?.phone)
  const [address, setAddress] = useState(user?.address)
  const [birthday, setBirthday] = useState(user?.birthday)

  const formRef = useRef()
  const inputImgRef = useRef()
  const navigate = useNavigate()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const mySwal = withReactContent(Swal)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('se envio el formulario')
    const data = new FormData(formRef.current)
    console.log(data.get('image'))
    fetchUpdateUser(data)
  }

  const fetchUpdateUser = async (data) => {
    try {
      let response = await callEndpoint(updateUser(user?.id, data))
      if (response.status === 200) {
        updateUserData(user?.id)
        endOk()
      }     
    } catch (e) {
      endConflict()
    }
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
    html: <div><p>No fue posible realizar la actualización..!</p></div>
  })

  const verifyNoEmpty = () => {
    const inputs = document.querySelectorAll('.input_group2__input')
    inputs.forEach(input => {
      if (input.value !== '') {
        input.classList.add('no_empty')
      } else {
        input.classList.remove('no_empty')
      }
    });
  }

  const handleImgClick = () => {
    console.log(inputImgRef.current.click())
  }

  const handleChange = (e) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      const reader = new FileReader(e.target.files[0])
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setPreview(notImage)
    }
  }

  useEffect(()=>{
    verifyNoEmpty()
  },[name, last_name, phone, address, birthday])

  return (
    <div className="card_modal editProfileModal_wrapper">
      {isLoading && <PageLoadingSpiner/>}

      <div className="title">
        <h3>
          <RiShieldUserFill />
          <span>Editar Mi Perfil</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}> 

          <CustomEditImagenInput 
            name="image"
            data={preview} 
          />
          {/* <div className="image_input" onClick={handleImgClick}>
            <picture>
              <img src={preview} alt="" className="image_input__img" />
              <input
                name="image"
                ref={inputImgRef}
                onChange={handleChange}
                type="file"
                className="image_input__input"
              />
            </picture>
          </div> */}

          <div className="edit_row">
            <div className="input_group2">
              <input 
                className="input_group2__input"
                type="text" 
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="input_group2__label">Nombres</label>
              <div className="input_group2__underline"></div>
            </div>

            <div className="input_group2">
              <input 
                className="input_group2__input"
                type="text" 
                name="last_name" 
                value={last_name}
                onChange={(e) => setLast_Name(e.target.value)}
              />
              <label className="input_group2__label">Nombres</label>
              <div className="input_group2__underline"></div>
            </div>            
          </div>
          
          <div className="edit_row">
            <div className="input_group2">
              <input 
                className="input_group2__input"
                type="text" 
                name="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="input_group2__label">Telefóno</label>
              <div className="input_group2__underline"></div>
            </div>

            <div className="input_group2">
              <input 
                className="input_group2__input"
                type="date" 
                name="birthday" 
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <label className="input_group2__label">Telefóno</label>
              <div className="input_group2__underline"></div>
            </div> 
          </div>

          <div className="input_group2">
            <input 
              className="input_group2__input"
              type="text" 
              name="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="input_group2__label">Dirección</label>
            <div className="input_group2__underline"></div>
          </div> 

          <PrimaryBtn label="Guardar" type="submit">
            <RiSave3Fill/>
          </PrimaryBtn>

        </form>
      </div>
    </div>
  )
}
