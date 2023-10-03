import { RiUser2Fill } from "react-icons/ri";
import { EmployeesTable } from "../../containers/employeesTable/EmployeesTable";

import {getEmployesFilter} from '../../services/employees.service'
import {getCompanies} from '../../services/companies.service'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { useEffect, useState } from "react";

export const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState('')
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const handleGetEmployees = async () => {
    try {
      let respose = await callEndpoint(getEmployesFilter({"company":'255'}))
      setEmployees(respose.data)
    } catch (e) {
      console.error(e)
    }
  }
  const handleGetCompanies = async () => {
    try {
      let respose = await callEndpoint(getCompanies())
      setCompanies(respose.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleGetCompanies()
  },[])
  useEffect(() => {
    handleGetEmployees()
  }, [companies])

  return (
    <div className='employees_wrapper p-4 flex flex-col justify-center'>
      <div className="page_title">
        <h2 className='title'>
          <RiUser2Fill />
          Empleados
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="fiter_by_company">
        <label htmlFor="company_id">Empresa:</label>
        <select name="company" id="company_id" >
          <option value="">Todas</option>
          {companies.map(({id, name, url_img}) => (
            <option value="id">
              <img src={url_img} alt="" />
              <p>{name}</p>
            </option>
          ))}
        </select>
      </div>

      <div className="table_employes_container">
        <EmployeesTable data={employees} />
      </div>
    </div>
  )
}
