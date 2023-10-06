import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import { getOneEmployee } from "../../services/employees.service"
import noImg from '../../assets/img/not-img.jpg'
import {
  RiFileSearchFill, RiCoinsFill,
  RiCreativeCommonsByFill, RiAddCircleFill,
  RiArrowDownSFill, RiDeleteBin5Fill
} from 'react-icons/ri'
import './detailEmployee.css'
import { deleteFamilyMembers, getFamilyMembers } from "../../services/familyMembers.service"
import {useModal} from '../../hooks/useModal'
import { ModalContainer } from "../../containers/modalContainer/ModalContainer";
import {AddFamilyMember} from '../../components/addFamilyMember/AddFamilyMember'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { EmployePaymentTickets } from "../../containers/employePaymentTickets/EmployePaymentTickets";


export const DetailEmployee = () => {

  const [employee, setEmployee] = useState('')
  const [familyMembers, setFamilyMembers] = useState([])
  const [showTable, setShowTable] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()
  const navigate = useNavigate()
  const {
    isVisible:isVisibleFamily,
    showModal:openFamily,
    closeModal:closeFamily
  } = useModal()
  const mySwal = withReactContent(Swal)

  const fetchDataEmployee = async () => {
    try {
      let result = await callEndpoint(getOneEmployee(params.employeeId))
      // console.log(result.data)
      setEmployee(result.data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchFamilyMembers = async () => {
    try {
      let response = await callEndpoint(getFamilyMembers())
      setFamilyMembers(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchDeleteFamilyMembers = async (id) => {
    try {
      let response = await callEndpoint(deleteFamilyMembers(id))
      if (response.status == 200) {
        Swal.fire(
          'Eliminado!',
          'El familiar fue eliminado con exito.',
          'success'
        ).then((result) => {
          navigate(0)
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const deleteSwalConfirm = (name, id) => {
    console.log(name)
    mySwal.fire({
      title:'Seguro que desea eleminar al familiar',
      text: `Se eliminara a ${name} como familiar`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#821953',
      cancelButtonColor: '#df4f35',
      confirmButtonText: 'Si, emliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetchDeleteFamilyMembers(id)
      }
    })
  }

  useEffect(() => {
    fetchDataEmployee()
    fetchFamilyMembers()
  },[])

  return (
    <div className="detailEmployee_wrapper p-4 flex flex-col justify-center">

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          {/* <RiBuilding2Fill /> */}
          <picture>
            <img src={`${employee.url_img !== "" ? ('http://127.0.0.1:8000'+employee.url_img) : noImg}`} alt="" />
          </picture>
          {employee.get_full_name}
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="employeInfo">
        <h5>Información del Empleado</h5>
        <div className="info">
          <p>Empresa: <span>{employee.get_company_name}</span></p>
          <p>Departamento: <span>{employee.get_department_name}</span> </p>
          <p>Puesto: <span>{employee.job_position?.name}</span> </p>
          <p>Salario: <span>Q. {employee.job_position?.salary}</span></p>
        </div>
      </div>

      <div className="family_info">
        <div className="title" onClick={() => setShowTable(!showTable)}>
          <h5>
            <RiCreativeCommonsByFill/>
            Familares
          </h5>
          <i className={`${showTable && 'show'}`}>
            <RiArrowDownSFill/>
          </i>
        </div>
        <div className={`contanier ${showTable && 'show'}`}>
          <table className="table-auto famly_table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Parentesco</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {familyMembers?.length > 0
                ? familyMembers?.map(({
                  id, get_full_name, relation, calculate_old_year
                }) => (
                  <tr key={id}>
                    <td>{get_full_name}</td>
                    <td>{relation}</td>
                    <td>{calculate_old_year}</td>
                    <td>
                      <button onClick={() => deleteSwalConfirm(get_full_name, id)}>
                        <RiDeleteBin5Fill/>
                      </button>
                    </td>
                  </tr>
                ))
                :(<tr><td colSpan="4">No existen familiares registrados..!</td></tr>)
              }
            </tbody>
          </table>
        </div>
        <button onClick={openFamily} className="add_member_btn">
          <RiAddCircleFill/>
          <span>Agregar</span>
        </button>
      </div>

      <EmployePaymentTickets/>

      {isVisibleFamily && (
        <ModalContainer>
          <AddFamilyMember employeeId={employee.id} closeFn={closeFamily} />
        </ModalContainer>
      )}

    </div>
  )
}
