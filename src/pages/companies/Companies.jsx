import './companies.css'
import { useEffect, useState } from "react"
import { RiBuilding2Fill, RiSearchLine, RiFileAddFill } from "react-icons/ri";

import { CustomInput } from '../../components/ui/CustomInput'

import { AsyncTable } from "../../containers/asyncTable/AsyncTable"
import { getCompanies } from "../../services/companies.service"
import { useNavigate } from 'react-router-dom';
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import { PageLoadingSpiner } from '../../components/ui/PageLoadingSpiner';
import { ComapniesTables } from '../../containers/companiesTables/ComapniesTables';

export const Compaies = () => {

  const [data, setData] = useState([])
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      let response = await callEndpoint(getCompanies())
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <>
    {!isLoading 
      ? (
        <PageLoadingSpiner />
      ) 
      : (
        <div className="companies_wrapper p-4 flex flex-col justify-center">

          {/* Title */}
          <div className="page_title">
            <h2 className='title'>
              <RiBuilding2Fill />
              Empresas
            </h2>
            <div className="button_add">
              <button onClick={() => navigate('/companies-create')} className="primary_btn add_btn">
                <RiFileAddFill/>
                <span>Nueva</span>
              </button>
            </div>
            <div className="tite_border"></div>
          </div>

          <div className='companies_container'>
            {/* {data.map(company => (
              <p key={company.id}>{company.name}</p>
            ))} */}
            <ComapniesTables data={data} searchLabel="Buscar Empresas..!" />
          </div>

        </div>
      )
    }
    </>
  )
}
