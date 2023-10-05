import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RiCoinsFill, RiEdit2Fill, RiPrinterFill, RiArrowDownSFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import dayjs from "dayjs";
import {es} from "dayjs/locale/es"

import noImg from '../../assets/img/not-img.jpg'

import {PrimaryBtn} from '../../components/ui/PrimaryBtn'
import { PageLoadingSpiner } from "../../components/ui/PageLoadingSpiner"

import { getOneCompany, paymentNomina, getNominaPDF } from "../../services/companies.service"
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import { useModal } from "../../hooks/useModal";

import 'animate.css';
import './detailCompany.css'
import { EmployeCompanyTable } from "../../containers/employeCompanyTable/EmployeCompanyTable"
import { SecondaryBtn } from "../../components/ui/SecondaryBtn";
import { ThirdBtn } from "../../components/ui/ThirdBtn";
import { ModalContainer } from "../../containers/modalContainer/ModalContainer";
import { AddDepartment } from "../../components/addDepartment/AddDepartment";
import { AddPosition } from "../../components/addPosition/AddPosition";
import {AddPayment} from '../../components/addPayment/AddPayment'

dayjs.locale("es")
getNominaPDF

export const DetailCompany = () => {

  const [data, setData] = useState([])
  const [stateBtn, setStateBtn] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [deptos, setDeptos] = useState([])
  const MySwal = withReactContent(Swal)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const {
    showModal: openDeptModal,
    closeModal:closeDeptModal,
    isVisible:isVisibleDeptModal
  } = useModal()

  const {
    showModal: openPosModal,
    closeModal:closePosModal,
    isVisible:isVisiblePosModal
  } = useModal()

  const {
    showModal: openPaymentModal,
    closeModal:closePaymentModal,
    isVisible:isVisiblePaymentModal
  } = useModal()

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


  const departmentsAndPositions = () => {
    let list = []
    data?.get_departments !== undefined && data?.get_departments.map( item => {
      let positions = data?.get_job_positions.filter(pos => pos.department === item.id)
      item['positions'] = positions
      list.push(item)
    })
    setDeptos(list)
  }

  const handlePayBtn = () => {
    let month = dayjs(today).format('MMMM')
    var type = 0
    if (today.getDate() >= 14 & today.getDate() <= 16) {
      type = 1
    } else if (today.getDate() >= 27 & today.getDate() <= 31) {
      type = 2
    }
    MySwal.fire({
      title: `Pagar Nomina de ${month}`,
      text: `Esta seguro que desea realizar el pago de Nómina ${type===1?'Quincenal' : 'Mensual'} del mes de ${month}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar el pago..!',
    }).then((result) => {
      if (result.isConfirmed) {
        getPaymentExecute({"companyId":params.companyId, "type":type})}
    })
  }


  const handleAddShowClass = (id) => {
    document.getElementById(id).classList.toggle('show')
  }

  useEffect(() => {
    getData()
    departmentsAndPositions()
    check_pay_day()
  },[])

  useEffect(() => {
    departmentsAndPositions()
  },[data])



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

        {/* Pay Nomina */}
        <PrimaryBtn
          label="Pagar Nomina"
          // state={!data.activate_payment_option}
          callback={openPaymentModal}>
          <RiCoinsFill/>
        </PrimaryBtn>

        {/* Print Nomnina */}
        <SecondaryBtn
          label="Imprimir Nomina"
          callback={getPrintNomina}>
          <RiPrinterFill/>
        </SecondaryBtn>

        <ThirdBtn
        label="Agregar"
        addClass="drowpdown_btn"
        callback={() => setShowAdd(!showAdd)}>
          <RiArrowDownSFill />
          {showAdd && (
            <div className={`options_container animate__animated animate__fadeIn show`}>
              <p onClick={openDeptModal} className="btn">Departmanento</p>
              <p onClick={openPosModal} className="btn">Puesto</p>
            </div>
          )}
        </ThirdBtn>

        {/* Add Button */}
      </div>

      <div className="info_company">
        <div className="row row_one">
          <p>Correo Electronico: <span>{`${data.email !== null ? data.email : 'No registrado'}`}</span></p>
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

      <div className="deptos_and_positions">
        <h5>Departamentos y Puestos</h5>
        <div className="info_section">
          {deptos?.length > 0
            ? deptos.map(({id, name, positions}) => (
              <div key={id} className="deptos_section">

                <div className="subtitle depto" id={id} onClick={()=>handleAddShowClass(id)}>
                  <p>Departamento de {name}</p>
                  <RiArrowDownSFill/>
                </div>

                <div className="positions">
                  {positions?.length > 0
                    ? (
                      <ul>{positions.map(({id, name}) => (
                        <li key={id}>
                          {name}
                        </li>
                      ))
                        }</ul>
                    )
                    :(
                      <ul>
                        <li className="none">No se han regitrado puestos en el departamento</li>
                      </ul>
                    )}
                </div>
              </div> ))

            : (<p className="none">No se ha registrado departamentos</p>)}
        </div>
      </div>

      {isVisiblePaymentModal && <ModalContainer>
        <AddPayment closeFn={closePaymentModal} companyId={params.companyId} />
      </ModalContainer>}
      {isVisibleDeptModal && <ModalContainer>
        <AddDepartment closeFn={closeDeptModal} companyId={params.companyId} />
      </ModalContainer>}

      {isVisiblePosModal && <ModalContainer>
        <AddPosition closeFn={closePosModal} companyId={params.companyId} />
      </ModalContainer>}
    </div>
  )
}
