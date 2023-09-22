import './validate_buy.css'
import { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { getOneEmploye } from "../../services/employees.service";
import { useParams } from "react-router-dom";

export const ValidateBuy = () => {

  const [employe, setEmployee] = useState({})
  const params = useParams()

  const getEmployeData = async (id) => {
    const resutl = await getOneEmploye(id).then(value => setEmployee(value))
    return resutl
  }

  const get_day = () => {
    const date = new Date(Date.now())
    const day = date.getDate()
    return day
  }
  get_day()

  useEffect(() => {
    getEmployeData(params.employeeId)
  }, [])

  const return_aviable = () => {
    console.log(get_day())
    if (get_day() >= 28 || get_day() < 14) {
      return employe?.calculate_prepaid
    } else{
      return employe?.calculate_monthPayment
    }
  }
   console.log(employe)
  return (
    <div className='validate_buy_wrapper'>
      <div className="page_title">
        <h2 className='title'>
          <RiVerifiedBadgeFill />
          Validar Compra
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="employee_data">
        <img className="store_img_employee rounded-full"
          src={`http://127.0.0.1:8000${employe.url_img}`} alt="" />
        <h4>Empleado:
          <span>
            {employe?.get_full_name}
          </span>
        </h4>
        <h4>
          Empresa:
          <span>{employe?.job_position?.get_company}</span>
        </h4>
        <h4>
          Puesto:
          <span>{employe?.job_position?.name}</span>
        </h4>
        <h4>
          Dsiponible: 
          <span>
            Q. {return_aviable()}
          </span>
        </h4>
      </div>
    </div>
  )
}
