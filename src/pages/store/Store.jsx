import './store.css'
import { useEffect, useState } from "react"
import { getEmployes } from "../../services/employees.service"
import { RiStoreFill, RiFileInfoFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { StoreTable } from '../../containers/storeTable/StoreTable';
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'

export const Store = () => {

  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const getData = async () => {
    try {
      let response = await callEndpoint(getEmployes())
      console.log(response)
      setEmployees(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const handeleVerifyEmployee = (e) => {
    navigate(`/validate-buy/${e}`)
  }

  useEffect(() => {
    getData()
  },[])


  return (
    <div className="store_wrapper p-4 flex flex-col justify-center">
      <div className="page_title">
        <h2 className='title'>
          <RiStoreFill />
          Store
        </h2>
        <div className="tite_border"></div>
      </div>

      <table className='styled-table'>
        <thead>
          <tr>
            <th className='text-center' colSpan={2}>Empleado</th>
            <th className='text-center'>Empresa</th>
            <th className='text-center'>Puesto</th>
            <th className='text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee?.id}>
              <td className='text-center'><img className="store_img_employee rounded-full" src={`http://localhost:8000${employee?.url_img}`} alt="" /></td>
              <td className='text-center'>{employee?.get_full_name}</td>
              <td className='text-center'>{employee?.job_position?.get_company}</td>
              <td className='text-center'>{employee?.job_position?.name}</td>
              <td className='text-center'><button onClick={() => handeleVerifyEmployee(employee.id)} className='secondary_btn flex text-center'><RiFileInfoFill /><span>Verificar</span></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <select name="" id="">
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>{employee.name}</option>
        ))}
      </select>
      <button>Validar Compra</button> */}

      <StoreTable data={employees} />
    </div>
  )
}
