import { useEffect, useRef, useState } from "react";
import { RiUser2Fill, RiCloseCircleFill, RiSave2Fill } from "react-icons/ri";
import {CustomInput} from '../../components/ui/CustomInput'
import { CustomImageInput } from '../../components/ui/CustomImageInput';
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import {getCompanies, getDepartments, getPositions} from '../../services/companies.service'
import {addEmployee} from '../../services/employees.service'
import { useNavigate } from 'react-router-dom';
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './addEmployeeModal.css'


export const AddEmployeeModal = ({companyId, closeFn }) => {

  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [departmentsFilter, setDepartmentsFilter] = useState([])
  const [positionsFilter, setPositionsFilter] = useState([])

  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const SuccessSwall = withReactContent(Swal)
  const navigate = useNavigate()

  const fetchGetDepartments = async () => {
    try {
      let respose = await callEndpoint(getDepartments(companyId))
      setDepartments(respose.data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchGetPositions = async () => {
    try {
      let respose = await callEndpoint(getPositions())
      setPositions(respose.data)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataForm = new FormData(formRef.current)
    dataForm.append("company", companyId)
    console.log(dataForm)
    // fetchAddNewEmploye(dataForm)
  }

  const handleChangeDepartment = (e) => {
    const departmentId = e.target.value
    const list = positions.filter(item => item.department==departmentId)
    setPositionsFilter(list)
  }

  const fetchAddNewEmploye = async (data) => {
    try {
      let response = await callEndpoint(addEmployee(data))
      console.log(response)
      if (response.status === 201) {
        SuccessSwall.fire({
          icon: 'success',
          title: <p>Empleado Ingresado con exito..!</p>
        }).then(result => {
          navigate(0)
        })
      }
    } catch (e) {
      SuccessSwall.fire({
        icon: "error",
        title: "Error en el Servidor",
        text: e.message
      })
    }
  }

  useEffect(()=>{
    fetchGetDepartments()
    fetchGetPositions()
  },[])

  return (
    <div className="card_modal add_employee_modal animate__animated animate__bounceIn">
      {isLoading && <PageLoadingSpiner/>}
      <div className="title">
        <h3>
          <RiUser2Fill />
          <span>Crear Empleado</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="employee_info">

            <div className="img">
              <CustomImageInput name="photo" type='image' />
            </div>

            <div className="row row_one">
              <CustomInput name="name" label="Nombres" required={true} />
              <CustomInput name="last_name" label="Apellidos" required={true} />
            </div>

            <div className="row row_two">
              <CustomInput name="phone" label="Teleono" />
              <CustomInput type="date" name='birthday' label="Fecha de Nacimiento" />
            </div>

            <CustomInput name="address" label="Dirección" />

            <div className="row row_four">
              <div className="select_container select_department">
                <label htmlFor="department">Departamento:</label>
                <select onChange={handleChangeDepartment} className="select" name="department" id="">
                  <option value={null}>---------</option>
                  {departments.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="select_container select_position">
                <label htmlFor="job_position">Puesto:</label>
                <select className="select" name="job_position" id="">
                  <option value={null}>---------</option>
                  {positionsFilter.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type='submit' className="btn primary_btn">
              <RiSave2Fill/>
              <span>Crear</span>
            </button>

          </div>


        </form>

      </div>
      <div className="footer">
      </div>
    </div>
  )
}
