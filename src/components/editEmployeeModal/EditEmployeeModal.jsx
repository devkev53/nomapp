import { useFetchAndLoad } from '../../hooks/useFetchAndLoad'
import { RiUser2Fill, RiEdit2Fill, RiCloseCircleFill, RiSave2Fill } from "react-icons/ri";
import '../addEmployeeModal/addEmployeeModal.css'
import { useEffect, useRef, useState } from 'react';
import { CustomEditImagenInput } from '../ui/CustomEditImagenInput';
import { CustomInputEdit } from '../ui/CustomInputEdit';
import { getDepartments, getPositions } from '../../services/companies.service';
import { PageLoadingSpiner } from '../ui/PageLoadingSpiner';
import { updateOneEmployee } from '../../services/employees.service';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

export const EditEmployeeModal = ({ closeFn, employee }) => {

  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [departmentsFilter, setDepartmentsFilter] = useState([])
  const [positionsFilter, setPositionsFilter] = useState([])

  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const mySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    data.append("company", employee.get_company_id)
    console.log(data)
    fetchUpdaeEmployee(employee?.id, data)
  }


  const fetchUpdaeEmployee = async(id, data) => {
    try {
      let response = await callEndpoint(updateOneEmployee(id,data))
      response.status === 200 && endOk()
    } catch (e) {
      endConflict(e)
    }

  }

  const handleChangeDepartment = (e) => {
    const departmentId = e.target.value
    const list = positions.filter(item => item.department==departmentId)
    setPositionsFilter(list)
  }

  const fetchGetDepartments = async () => {
    try {
      let respose = await callEndpoint(getDepartments(employee?.get_company_id))
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

  useEffect(() => {
    fetchGetDepartments()
    fetchGetPositions()
  },[])

  useEffect(() => {
    const list = positions.filter(item => item.department==employee?.job_position.department)
    setPositionsFilter(list)
  },[positions])

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

  console.log(employee)

  return (
    <div className="card_modal add_employee_modal animate__animated animate__bounceIn">
      {isLoading && <PageLoadingSpiner/>}
      <div className="title">
        <h3>
          <RiUser2Fill />
          <span>Editar Empleado</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="employee_info">

            <div className="img">
              <CustomEditImagenInput
                data={employee?.url_img}
                name="photo"
              />
            </div>

            <div className="row row_one">
              <CustomInputEdit
                val={employee?.name}
                name="name"
                label="Nombres"
                required={true}
              />
              <CustomInputEdit
                val={employee?.last_name}
                name="last_name"
                label="Apellidos"
                required={true}
              />
            </div>

            <div className="row row_two">
              <CustomInputEdit
                  val={employee?.phone}
                  name="phone"
                  label="Telefono"
                  required={false}
                />
                <CustomInputEdit
                  val={employee?.birthday}
                  name="birthday"
                  type="date"
                  label="Fecha de Nacimiento"
                  required={false}
                />
            </div>

            <CustomInputEdit
                val={employee?.address}
                name="address"
                type="text"
                label="Dirección"
                required={false}
              />


            <div className="row row_four">
              <div className="select_container select_department">
                <label htmlFor="department">Departamento:</label>
                <select onChange={handleChangeDepartment} className="select" name="department" id="">
                  <option value={null}>---------</option>
                  {departments.map(({id, name}) => (
                    <option selected={id===employee?.job_position.department} key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="select_container select_position">
                <label htmlFor="job_position">Puesto:</label>
                <select className="select" name="job_position" id="">
                  <option value={null}>---------</option>
                  {positionsFilter.map(({id, name}) => (
                    <option selected={id===employee.job_position.id} key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type='submit' className="btn primary_btn">
              <RiSave2Fill/>
              <span>Guardar</span>
            </button>

          </div>


        </form>

      </div>
      <div className="footer">
      </div>
    </div>
  )
}
