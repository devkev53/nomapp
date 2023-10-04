import { RiCreativeCommonsByFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {CustomInput} from '../ui/CustomInput'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { PrimaryBtn } from "../../components/ui/PrimaryBtn"

import '../../styles/cardModal.css'
import { createFamilyMembers } from "../../services/familyMembers.service";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const AddFamilyMember = ({employeeId, closeFn}) => {

  const formRef = useRef()
  const navigate = useNavigate()
  const {callEndpoint} = useFetchAndLoad()
  const mySwal = withReactContent(Swal)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('se envio el formulario')
    const data = new FormData(formRef.current)
    data.append("employee", employeeId)
    fetchAddFamilyMember(data)
  }

  const fetchAddFamilyMember = async(data) => {
    try {
      let response = await callEndpoint(createFamilyMembers(data))
      if (response.status == 201) {
        mySwal.fire({
          icon: 'success',
          title: <p>El puesto fue creado con exito con exito..!</p>
        }).then(result => {
          navigate(0)
          closeFn()
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="card_modal addFamilyMember_wrapper">
      <div className="title">
        <h3>
          <RiCreativeCommonsByFill />
          <span>Nuevo Familiar</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <CustomInput name="name" label="Nombres" required={true} />
          <CustomInput name="last_name" label="Apellidos" required={true} />
          <CustomInput name="birthday" label="Fecha de Nacimiento" type="date"/>
          <div className="select">
            <select name="relation" required>
              <option value="mama">Mamá</option>
              <option value="papa">Papá</option>
              <option value="hijo">Hijo</option>
              <option value="hija">Hija</option>
              <option value="esposo">Esposo</option>
              <option value="esposa">Esposa</option>
              <option value="Hermano">Hermano</option>
              <option value="Hermana">Hermana</option>
            </select>
          </div>

          <PrimaryBtn label="Guardar" type="submit">
            <RiSave3Fill/>
          </PrimaryBtn>

        </form>
      </div>
    </div>
  )
}
