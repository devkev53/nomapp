import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RiCoinsFill, RiEdit2Fill, RiPrinterFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import dayjs from "dayjs";
import {es} from "dayjs/locale/es"

import noImg from '../../assets/img/not-img.jpg'

import {PrimaryBtn} from '../../components/ui/PrimaryBtn'
import { PageLoadingSpiner } from "../../components/ui/PageLoadingSpiner"

import { getOneCompany, paymentNomina, getNominaPDF } from "../../services/companies.service"
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'

import './detailCompany.css'
import { EmployeCompanyTable } from "../../containers/employeCompanyTable/EmployeCompanyTable"
import { SecondaryBtn } from "../../components/ui/SecondaryBtn";

dayjs.locale("es")
getNominaPDF

export const DetailCompany = () => {

  const [data, setData] = useState([])
  const [stateBtn, setStateBtn] = useState(true)
  const MySwal = withReactContent(Swal)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()


  const getPrintNomina = async () => {
    const data = {"month":"", "year":""}
    let response = await callEndpoint(getNominaPDF(params.companyId, data))
    console.log(response)
    const blob = response.data
    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.target = '_blank'
    alink.click()
  }


  const getData = async () => {
    try {
      let response = await callEndpoint(getOneCompany(params.companyId))
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const timestamp = Date.now()
  const today = new Date(timestamp)

  const check_pay_day = () => {
    if (today.getDate() >= 14 & today.getDate() <= 16) {
      return setStateBtn(false)
    } else if (today.getDate() >= 28 & today.getDate() <= 31) {
      return setStateBtn(false)
    }
    return setStateBtn(false)
  }

  const getPaymentExecute = async () => {
    try {
      let response = await callEndpoint(paymentNomina(params.companyId))
      endPaymentNominaOK()
      return response.data
    } catch (e) {
      endPaymentNominaConflict()
    }
  }

  const handlePayBtn = () => {
    let month = dayjs(today).format('MMMM')
    let type = ''
    if (today.getDate() >= 14 & today.getDate() <= 16) {
      type = 'Quincena'
    } else if (today.getDate() >= 27 & today.getDate() <= 31) {
      type = 'Mes'
    }
    MySwal.fire({
      title: `Pagar Nomina de ${month}`,
      text: `Esta seguro que desea realizar el pago de ${type} del mes de ${month}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar el pago..!',
    }).then((result) => {
      if (result.isConfirmed) {
        data.activate_payment_option && getPaymentExecute()}
    })
  }

  const endPaymentNominaOK  = () => MySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
    html: <a className="btn secondary_btn" href="" target="_blank">Imprimir Nomina</a>
  })
  const endPaymentNominaConflict = () => MySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    text: 'No fue posible realiar el pago verifique con el administrador del sistema..!'
  })

  useEffect(() => {
    getData()
    check_pay_day()
  },[])



  return (
    <div className='detailCompany_wrapper p-4 flex flex-col justify-center'>
      {isLoading && <PageLoadingSpiner/>}
      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          {/* <RiBuilding2Fill /> */}
          <picture>
            <img src={`${data.logo !== null ? ('http://127.0.0.1:8000'+data.logo) : noImg}`} alt="" />
          </picture>
          {data.name}
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="button_actions">
        <PrimaryBtn
          label="Pagar Nomina"
          state={!data.activate_payment_option}
          callback={handlePayBtn}
        >
          <RiCoinsFill/>
        </PrimaryBtn>
        <SecondaryBtn 
          label="Imprimir Nomina"
          callback={getPrintNomina}
        >
          <RiPrinterFill/>
        </SecondaryBtn>
        {/* <button className="primary_btn"><RiEdit2Fill/><span>Editar</span></button>
        <button className="secondary_btn"><RiCoinsFill/><span>Pagar Nomina</span></button> */}
      </div>

      <div className="info_company">
        <div className="row row_one">
          <p>Correo Electronico: <span>{`${data.email !== "" ? data.eamil : 'No registrado'}`}</span></p>
          <p>Telefono: <span>{`${data.phone !== "" ? data.phone : 'No registrado'}`}</span></p>
          <p>Dirección: <span>{`${data.address !== '' ? data.address : 'No registrado'}`}</span></p>
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
