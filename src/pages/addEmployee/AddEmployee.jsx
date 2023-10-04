import { useEffect, useRef, useState } from "react";
import { RiUser2Fill, RiArrowDownSFill, RiSave2Fill } from "react-icons/ri";
import {CustomInput} from '../../components/ui/CustomInput'
import { CustomImageInput } from '../../components/ui/CustomImageInput';
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import {getCompanies, getDepartments, getPositions} from '../../services/companies.service'
import {addEmployee} from '../../services/employees.service'
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './addEmployee.css'

export const AddEmployee = () => {
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState(null)
  const [departments, setDepartments] = useState([])
  const [departmentsFilter, setDepartmentsFilter] = useState([])
  const [positions, setPositions] = useState([])
  const [positionsFilter, setPositionsFilter] = useState([])

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const formRef = useRef()
  const SuccessSwall = withReactContent(Swal)
  const navigate = useNavigate()



  const fetchGetCompanies = async () => {
    try {
      let respose = await callEndpoint(getCompanies())
      setCompanies(respose.data)
    } catch (e) {
      console.error(e)
    }
  }
  const fetchGetDepartments = async () => {
    try {
      let respose = await callEndpoint(getDepartments(company))
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

  const fetchAddNewEmploye = async (data) => {
    try {
      let response = await callEndpoint(addEmployee(data))
      if (response.status == 201) {
        SuccessSwall.fire({
          icon: 'success',
          title: <p>Empleado Ingresado con exito..!</p>
        }).then(result => {
          navigate('/employees')
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


  const handleChangeCompany = (e) => {
    const companyId = e.target.value
    const list = departments.filter(item => item.company == companyId)
    setDepartmentsFilter(list)
  }
  const handleChangeDepartment = (e) => {
    const departmentId = e.target.value
    console.log(positions)
    const list = positions.filter(item => item.department==departmentId)
    setPositionsFilter(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataForm = new FormData(formRef.current)
    fetchAddNewEmploye(dataForm)
  }


  useEffect(()=>{
    fetchGetDepartments()
    fetchGetPositions()
    fetchGetCompanies()
  },[company])

  // console.log(departments)

  return (
    <div className="addEmploye_wrapper p-4 flex flex-col justify-center">
      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          <RiUser2Fill />
          Crear Empleado
        </h2>
        <div className="tite_border"></div>
      </div>

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
            <CustomInput name="address" label="Dirección" />
          </div>

          <div className="row row_thre">
            <div className="select_container select_company">
              <label htmlFor="company">Empresa:</label>
              <select onChange={handleChangeCompany} className="select" name="company" id="">
                <option value={null}>---------</option>
                {companies.map(({id, name}) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>

            <div className="select_container select_department">
              <label htmlFor="department">Departamento:</label>
              <select onChange={handleChangeDepartment} className="select" name="department" id="">
                <option value={null}>---------</option>
                {departmentsFilter.map(({id, name}) => (
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


        </div>

        <button type='submit' className="btn primary_btn">
          <RiSave2Fill/>
          <span>Crear</span>
        </button>

      </form>
    </div>
  )
}
