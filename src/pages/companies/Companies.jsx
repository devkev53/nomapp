import './companies.css'
import { useEffect, useState } from "react"
import { RiBuilding2Fill, RiSearchLine, RiFileAddFill } from "react-icons/ri";

import { CustomInput } from '../../components/ui/CustomInput'

import { AsyncTable } from "../../containers/asyncTable/AsyncTable"
import { getCompanies } from "../../services/companies.service"
import { useNavigate } from 'react-router-dom';

export const Compaies = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  const handleFetchUsers = async () => {
    try {
      const response = await getCompanies()
      setData(response)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    handleFetchUsers()
  },[])

  console.log(data)

  return (
    <div className="companies_wrapper p-4 flex flex-col justify-center">

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          <RiBuilding2Fill />
          Empresas
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="search_and_add">
        {/* Search component */}
        <CustomInput name="search">
          <RiSearchLine/>
          Buscar
        </CustomInput>

        {/* Add Btn */}
        <button onClick={() => navigate('/companies-create')} className="primary_btn add_btn">
          <RiFileAddFill/>
          <span>Nueva</span>
        </button>
      </div>

      <div>
        {data.map(company => (
          <p key={company.id}>{company.name}</p>
        ))}
      </div>

    </div>
  )
}
