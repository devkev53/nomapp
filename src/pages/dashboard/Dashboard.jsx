import { 
  RiDashboardFill, RiCalendarEventFill, 
  RiBuilding2Fill, RiUser2Fill 
} from "react-icons/ri";

import {getEmployees} from '../../services/employees.service'
import {getCompanies} from '../../services/companies.service'
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import {chekFortnightPayment, chekMonthlyPayment, restPayDays} from '../../utilitys/checkPayDay'
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'


import './dashboard.css'
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [numCompanies, setNumCompanies] = useState(0)
  const [numEmployees, setNumEmployees] = useState(0)
  const [numPayDays, setNumPayDays] = useState(0)

  const {isLoading, callEndpoint} = useFetchAndLoad()

  const timestamp = Date.now()
  const today = new Date(timestamp)

  const countCompanies = async () => {
    try {
      let response = await callEndpoint(getCompanies())
      setNumCompanies(response.data.length)
    } catch (e) {
        console.error(e)
    }
  }

  const countEmployees = async () => {
    try {
      let response = await callEndpoint(getEmployees())
      setNumEmployees(response.data.length)
    } catch (e) {
        console.error(e)
    }
  }

  const checkPayDate = () => {
    if (restPayDays() > 31) {
      setNumPayDays(0)
    } else {
      setNumPayDays(restPayDays())
    }
  }


  useEffect(()=>{
    checkPayDate()
    countCompanies()
    countEmployees()
  },[])


  return (
    <div className="dashboard_wrapper p-4 flex flex-col justify-center">

      {isLoading && <PageLoadingSpiner/>}

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          <RiDashboardFill />
          Dashboard
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="content">
        <div className="cards_dash">

          <div className="date card_dash_container">
            <div className="icon">
              <RiCalendarEventFill/>
            </div>

            <div className="info_card">
              <p>Faltan</p>
              <p className="number">{numPayDays}</p>
              <p>Para el Pago</p>
            </div>
          </div>
          
          <div className="companies card_dash_container">
            <div className="icon">
              <RiBuilding2Fill/>
            </div>
            <div className="info_card">
              <p>Gestionando</p>
              <p className="number">{numCompanies}</p>
              <p>Empresas</p>
            </div>
          </div>
          
          <div className="employees card_dash_container">
            <div className="icon">
              <RiUser2Fill/>
            </div>
            <div className="info_card">
              <p>Administrando</p>
              <p className="number">{numEmployees}</p>
              <p>Empleados</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
