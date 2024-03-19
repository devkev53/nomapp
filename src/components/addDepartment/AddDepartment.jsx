import { RiHomeGearFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom"

import '../../styles/cardModal.css'
import { CustomInput } from "../ui/CustomInput"
import { PrimaryBtn } from "../ui/PrimaryBtn"
import { useRef } from "react";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { createDepartments } from "../../services/companies.service";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'


export const AddDepartment = ({companyId, closeFn}) => {

  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const SuccessSwall = withReactContent(Swal)
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    data.append('company', parseInt(companyId))
    fetchAddDepartment(data)
  }

  const fetchAddDepartment = async(data) => {
    try {
      let response = await callEndpoint(createDepartments(data))
      console.log(response)
      if (response.status == 201) {
        SuccessSwall.fire({
          icon: 'success',
          title: <p>Departamento creado con exito..!</p>
        }).then(result => {
          closeFn()
          navigate(0)
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="card_modal addDepartment_card animate__animated animate__bounceIn">
      {isLoading && <PageLoadingSpiner/>}
      <div className="title">
        <h3>
          <RiHomeGearFill />
          <span>Agregar Departamento</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <CustomInput
          label="Departamento"
          name="name"/>
        <button className="btn primary_btn" type="submit">
          <RiSave3Fill />
          <span>Guardar</span>
        </button>
        </form>
      </div>
      <div className="footer">
      </div>
    </div>
  )
}
