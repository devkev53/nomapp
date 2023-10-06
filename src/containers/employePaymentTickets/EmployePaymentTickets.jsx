import { useEffect, useState } from "react"

import {
  RiFileSearchFill, RiCoinsFill, RiFileDownloadFill
} from 'react-icons/ri'
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import {months} from '../../utilitys/months-spanish.utils'
import { PrimaryBtn } from "../../components/ui/PrimaryBtn"
import {checkPayments, downloadTicket} from '../../services/employees.service'
import { useParams } from "react-router-dom"
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'

export const EmployePaymentTickets = () => {

  const [years, setYears] = useState([])
  const [payments, setPayments] = useState([])

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()

  const actualYear = new Date().getFullYear()
  const actualMonth = new Date().getMonth() + 1

  const calculateYears = () => {
    const listYears = []
    const date = new Date();
    const actualYear = new Date(date).getFullYear()
    for (let i = 2020; i <= actualYear; i++) {
      listYears.push(i)
    }
    setYears(listYears)
  }

  useEffect(() => {
    calculateYears()
  },[])

  const handleCkeckPayments = () => {
    let year = document.querySelector('#year').value
    let month = document.querySelector('#month').value
    let employeeId = params.employeeId
    let querys = `month=${month}&year=${year}`
    fetchGetPaymentTickets(employeeId, querys)
  }

  const handleCliclDownloadTicket = (type, id) => {
    fetchDownloadTicket(type, id)
  }

  const fetchGetPaymentTickets = async (employeeId, querys) => {
    try {
      let response = await callEndpoint(checkPayments(employeeId, querys))
      setPayments(response.data.result)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchDownloadTicket = async(type, id) => {
    try {
      let response = await callEndpoint(downloadTicket(type, id))
      if (response.status === 200) {
        const blob = response.data
        const fileURL = window.URL.createObjectURL(blob)
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.target = '_blank'
        alink.click()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
    {isLoading && <PageLoadingSpiner/>}
    <div className="payment_info">
      <h5>
        <RiCoinsFill/>
        Descargar Boleta de Pago
      </h5>
      <div className="filters">
        <div className="month">
          <label htmlFor="month">Mes</label>
          <select name="month" id="month">
            {months.map(({id,name}) => (
              <option key={id} selected={actualMonth===id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="year">
          <label htmlFor="year">Año</label>
          <select name="year" id="year">
            {years?.map(item => (
              <option key={item} selected={actualYear === item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <PrimaryBtn label="Buscar" callback={handleCkeckPayments}>
          <RiFileSearchFill/>
        </PrimaryBtn>
      </div>
      <div className="resutls_tickets">
        {payments != null
          ? payments.map( pay => (
            pay != null && (
              <div key={`${pay.id}-${pay.type_payment}`} className="ticket_row">
                <p>{pay.description}</p>
                <button onClick={() => handleCliclDownloadTicket(pay.type_payment, pay.id)}>
                  <RiFileDownloadFill />
                  <span>Descargar</span>
                </button>
              </div>
            )
          ))
          :(<p className="no_payments">No se encontraron resultados..!</p>)
        }
      </div>
    </div>
    </>
  )
}
