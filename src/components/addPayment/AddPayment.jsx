import { useRef, useEffect, useState } from "react";
import { RiCoinsFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import {CustomInput} from '../ui/CustomInput'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { PrimaryBtn } from "../../components/ui/PrimaryBtn"
import {months} from '../../utilitys/months-spanish.utils'
import { paymentNomina} from "../../services/companies.service"
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const AddPayment = ({companyId, closeFn}) => {

  const [years, setYears] = useState([])
  const [type, setType] = useState('1')
  const [showMonth, setShowMonth] = useState(true)

  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const actualYear = new Date().getFullYear()
  const actualMonth = new Date().getMonth() + 1


  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const calculateYears = () => {
    const listYears = []
    const date = new Date();
    const actualYear = new Date(date).getFullYear()
    for (let i = 2020; i <= actualYear; i++) {
      listYears.push(i)
    }
    setYears(listYears)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('se envio el formulario')
    const data = new FormData(formRef.current)
    data.append("companyId", companyId)
    if (type === '3') {
      data.append('month', '7')
    } else if (type === '4') {
      data.append('month', '12')
    }
    console.log(data)
    fetchPaymentExecute(data)
  }

  const endPaymentNominaOK  = () => MySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    // navigate(0)
  })
  const endPaymentNominaConflict = () => MySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible realiar el pago de Nomina verifique con el administrador del sistema..!</p> <p>Es posible que ya se halla realizado el pago..!</p></div>
  })

  const fetchPaymentExecute = async (data) => {
    try {
      let response = await callEndpoint(paymentNomina(data))
      endPaymentNominaOK()
      return response.data
    } catch (e) {
      endPaymentNominaConflict()
    }
  }

  useEffect(()=>{
    calculateYears()
  },[])

  useEffect(()=>{
    if (type === '1' || type === '2') {
      setShowMonth(true)
    } else {
      setShowMonth(false)
    }
  },[type])

  return (
    <div className="card_modal addFamilyMember_wrapper">
      {isLoading && <PageLoadingSpiner/>}

      <div className="title">
        <h3>
          <RiCoinsFill />
          <span>Registrar Pago de Nomina</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="select">
            <select name="type" required value={type} onChange={(e) => setType(e.target.value)}>
              <option value="1">Nómina Quincenal</option>
              <option value="2">Nómina Mensual</option>
              <option value="3">Nómina Bono 14</option>
              <option value="4">Nómina Aguinaldo</option>
            </select>
          </div>
          <div className="select">
            <select name="year" required>
              {years?.map(item => (
                <option key={item} selected={actualYear === item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {showMonth && (
            <div className="select">
              <select name="month" required>
                {months.map(({id,name}) => (
                  <option key={id} selected={actualMonth===id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          )}

          <PrimaryBtn label="Guardar" type="submit">
            <RiSave3Fill/>
          </PrimaryBtn>
        </form>
      </div>
    </div>
  )
}
