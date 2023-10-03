import { RiUser2Fill, RiArrowDownSFill, RiFileAddFill } from "react-icons/ri";
import { EmployeesTable } from "../../containers/employeesTable/EmployeesTable";

import noImg from '../../assets/img/not-img.jpg'

import {getEmployeesFilter, getEmployees} from '../../services/employees.service'
import {getCompanies} from '../../services/companies.service'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { useEffect, useState } from "react";
import {PrimaryBtn} from '../../components/ui/PrimaryBtn'

import './employees.css'
import { useNavigate } from "react-router-dom";

export const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({id:'', name:'Sin Selección', logo:null})
  const [showLisCompanies, setShowLisCompanies] = useState(false)
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const navigate = useNavigate()

  const handleGetEmployees = async () => {
    try {
      if (company.id >= 1) {
        let respose = await callEndpoint(getEmployeesFilter(company.id))
        setEmployees(respose.data)
      } else {
        let respose = await callEndpoint(getEmployees())
        setEmployees(respose.data)
      }
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

  const handleCompanyIdChange = (data) => {
    setShowLisCompanies(false)
    setCompany(data)
  }

  useEffect(() => {
    handleGetCompanies()
  },[])

  useEffect(() => {
    handleGetEmployees()
  }, [company])

  return (
    <div className='employees_wrapper p-4 flex flex-col justify-center'>
      <div className="page_title">
        <h2 className='title'>
          <RiUser2Fill />
          Empleados
        </h2>
        <div className="button_add">
          <PrimaryBtn callback={() => navigate('/add-employee')} label="Agregar">
            <RiFileAddFill/>
          </PrimaryBtn>
        </div>
        <div className="tite_border"></div>
      </div>

      <div className="fiter_by_company">
        <p className="label">Filtrar por Empresa:</p>
        <div className="companies_container">

          <div className="company_selcted" 
            onClick={() => setShowLisCompanies(!showLisCompanies)}>
            <img
                className="img_preview"
                src={`${company.logo === null ? noImg : ('http://127.0.0.1:8000'+company.logo)}`} alt="" />
              <p>{company.name}</p>
            <RiArrowDownSFill/>
          </div>

          <div className={`companies_list ${showLisCompanies && 'visible'}`}>
              <div
                className="company_content"
                onClick={() => {setShowLisCompanies(false), setCompany({id:'', name:'Sin Selección', logo:null})}}>
                <img className="img_preview" src={noImg} alt="" />
                <p>Sin Selección</p>
              </div>
            {companies.map(({id, name, logo}) => (
              <div
                onClick={() => handleCompanyIdChange({id, name, logo})}
                key={id}
                className="company_content">
                <img
                  className="img_preview"
                  src={`${logo === null ? noImg : ('http://127.0.0.1:8000'+logo)}`} alt="" />
                <p>{name}</p>
              </div>
            ))}
          </div>

        </div>
        {/* <label htmlFor="company_id">Empresa:</label>
        <select onChange={handleCompanyIdChange}
          name="company">
          <option value=''>Sin Seleccion</option>
          {companies.map(({id, name, url_img}) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select> */}
      </div>

      <div className="table_employes_container">
        <EmployeesTable data={employees} />
      </div>
    </div>
  )
}
