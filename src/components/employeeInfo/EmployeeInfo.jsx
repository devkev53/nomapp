import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import noImg from '../../assets/img/not-img.jpg'

import { getOneEmploye } from "../../services/employees.service";

import './employeeInfo.css'

export const EmployeeInfo = () => {

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

  const return_aviable = () => {
    if (get_day() >= 28 || get_day() < 14) {
      return employe?.calculate_prepaid / 2
    } else{
      return employe?.calculate_monthPayment / 2
    }
  }

  useEffect(() => {
    getEmployeData(params.employeeId)
  }, [])

  return (
    <div className='employeeInfo_wrapper'>
      <picture>
        <img 
          src={`${employe.url_img !== "" 
            ? `http://127.0.0.1:8000${employe.url_img}`
            : noImg}`
          }
          alt="photo"
        />
      </picture>
      <div>
        <p>Empleado: 
          <span>{employe?.get_full_name}</span>
        </p>
        <p>Disponible: 
          <span className="disponible">Q {return_aviable()}</span>
        </p>
      </div>
      <div>
        <p>Empresa:
          <span>{employe?.job_position?.get_company}</span>
        </p>
        <p>Puesto:
          <span>{employe?.job_position?.name}</span>
        </p>
      </div>
    </div>
  )
}
