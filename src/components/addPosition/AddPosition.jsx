import { RiShieldStarFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom"
import { useRef } from "react";

import '../../styles/cardModal.css'
import { CustomInput } from "../ui/CustomInput"
import { PrimaryBtn } from "../ui/PrimaryBtn"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { useEffect, useState } from "react";
import { getDepartments, createPositions } from "../../services/companies.service";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const AddPosition = ({closeFn, companyId}) => {

  const [departments, setDepartments] = useState([])

  const formRef = useRef()
  const {callEndpoint} = useFetchAndLoad()
  const SuccessSwall = withReactContent(Swal)

  const fetchGetDeptosCompany= async () => {
    try {
      let response = await callEndpoint(getDepartments(companyId))
      setDepartments(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    fetchAddPosition(data)
  }

  const fetchAddPosition = async(data) => {
    try {
      let response = await callEndpoint(createPositions(data))
      if (response.status == 201) {
        SuccessSwall.fire({
          icon: 'success',
          title: <p>El puesto fue creado con exito con exito..!</p>
        }).then(result => {
          closeFn()
          // navigate('/employees')
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    fetchGetDeptosCompany()
  },[])

  return (
    <div className="card_modal addDepartment_card animate__animated animate__bounceIn">
      <div className="title">
        <h3>
          <RiShieldStarFill />
          <span>Agregar Puesto de Trabajo</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <select name="department">
            {departments.length > 0
              ? departments.map(({id, name}) => (
                <option key={id} value={id}>{name}</option>
              ))
              : <option>-------------</option>
            }
          </select>
          <CustomInput
          label="Puesto de Trabajo"
          name="name"/>

          <CustomInput
          label="Salario"
          name="salary"
          type="number"/>
        <PrimaryBtn>
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
