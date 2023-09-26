import { useEffect, useState } from "react"
import { RiCoinsFill, RiEdit2Fill } from "react-icons/ri";

import noImg from '../../assets/img/not-img.jpg'
import { getOneCompany } from "../../services/companies.service"
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import { useParams } from "react-router-dom"
import { PageLoadingSpiner } from "../../components/ui/PageLoadingSpiner"

import './detailCompany.css'
import { EmployeCompanyTable } from "../../containers/employeCompanyTable/EmployeCompanyTable"


export const DetailCompany = () => {

  const [data, setData] = useState([])
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()
  const baseUrl = 'http://127.0.0.1:8000'


  const getData = async () => {
    try {
      let response = await callEndpoint(getOneCompany(params.companyId))
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  },[])

  console.log(isLoading)


  return (
    <div className='detailCompany_wrapper p-4 flex flex-col justify-center'>
      {!isLoading && <PageLoadingSpiner/>}
      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          {/* <RiBuilding2Fill /> */}
          <picture>
            <img src={`${data.logo !== null ? (baseUrl+data.logo) : noImg}`} alt="" />
          </picture>
          {data.name}
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="button_actions">
        <button className="primary_btn"><RiEdit2Fill/><span>Editar</span></button>
        <button className="secondary_btn"><RiCoinsFill/><span>Pagar Nomina</span></button>
      </div>

      <div className="info_company">
        <div className="row row_one">
          <p>Correo Electronico: <span>{`${data.email !== "" ? data.eamil : 'No registrado'}`}</span></p>
          <p>Telefono: <span>{`${data.phone !== "" ? data.phone : 'No registrado'}`}</span></p>
          <p>Dirección: <span>{`${data.address !== null ? data.address : 'No registrado'}`}</span></p>
          <p>Ciudad: <span>{`${data.city !== null ? data.city : 'No registrado'}`}</span></p>
        </div>
        <div className="row row_two">
          <p>Descripcion: <span>{`${data.description !== '' ? data.description : 'No registrado'}`}</span></p>
          <p>No de Empleados: <span>{`${data.num_employees}`}</span></p>
        </div>
      </div>

      <div className="employe_table_container">
        <EmployeCompanyTable companyId={params.companyId} />
      </div>
    </div>
  )
}
