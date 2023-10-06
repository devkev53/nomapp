import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiCloseCircleFill, RiFileDownloadFill,
  RiPrinterFill, RiArrowDownSFill,
  RiUser2Fill, RiHomeGearFill, RiShieldStarFill
} from "react-icons/ri";
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { PrimaryBtn } from "../ui/PrimaryBtn"
import {months} from '../../utilitys/months-spanish.utils'

import {getNominaPDF} from '../../services/companies.service'
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const PrintNomina = ({closeFn, companyId}) => {

  const [years, setYears] = useState([])

  const actualYear = new Date().getFullYear()
  const actualMonth = new Date().getMonth() + 1

  const formRef = useRef()
  const mySwall = withReactContent(Swal)
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
    fetchPrintNomina(companyId, data)
  }

  const fetchPrintNomina = async(companyId, data) => {
    try {
      let response = await callEndpoint(getNominaPDF(companyId, data))
      if (response.status === 200) {
        const blob = response.data
        const fileURL = window.URL.createObjectURL(blob)
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.target = '_blank'
        alink.click()
      }
    } catch (e) {
      mySwall.fire({
        icon: "error",
        title: "Error en el Servidor",
        text: e.message
      })
    }
  }

  useEffect(()=>{
    calculateYears()
  },[])

  return (
    <div className="card_modal">
      {isLoading && <PageLoadingSpiner/>}
      <div className="title">
        <h3>
          <RiPrinterFill />
          <span>Imprimir Pago de Nomina</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="select">
            <select name="type" required>
              <option value="1">Nómina Quincenal</option>
              <option value="2">Nómina Mensual</option>
            </select>
          </div>
          <div className="select">
            <select name="year" required>
              {years?.map(item => (
                <option key={item} selected={actualYear === item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="select">
            <select name="month" required>
              {months.map(({id,name}) => (
                <option key={id} selected={actualMonth===id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          <PrimaryBtn label="Descargar" type="submit">
            <RiFileDownloadFill/>
          </PrimaryBtn>
        </form>
      </div>
    </div>
  )
}
