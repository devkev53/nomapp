import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'
import { getOneEmployee } from "../../services/employees.service"
import noImg from '../../assets/img/not-img.jpg'


export const DetailEmployee = () => {

  const [employee, setEmployee] = useState('')
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()

  const fetchDataEmployee = async () => {
    try {
      let result = await callEndpoint(getOneEmployee(params.employeeId))
      console.log(result.data)
      setEmployee(result.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchDataEmployee()
  },[])

  return (
    <div className="detailEmployee_wrapper p-4 flex flex-col justify-center">

      {/* Title */}
      <div className="page_title">
        <h2 className='title'>
          {/* <RiBuilding2Fill /> */}
          <picture>
            <img src={`${employee.url_img !== "" ? ('http://127.0.0.1:8000'+employee.url_img) : noImg}`} alt="" />
          </picture>
          {employee.get_full_name}
        </h2>
        <div className="tite_border"></div>
      </div>

    </div>
  )
}
