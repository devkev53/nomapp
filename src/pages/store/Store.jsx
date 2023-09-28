import './store.css'
import { useEffect, useState } from "react"
import { getEmployes } from "../../services/employees.service"
import { RiStoreFill, RiFileInfoFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { StoreTable } from '../../containers/storeTable/StoreTable';
import {useFetchAndLoad} from '../../hooks/useFetchAndLoad'

export const Store = () => {

  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const getData = async () => {
    try {
      let response = await callEndpoint(getEmployes())
      console.log(response)
      setEmployees(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const handeleVerifyEmployee = (e) => {
    navigate(`/validate-buy/${e}`)
  }

  useEffect(() => {
    getData()
  },[])


  return (
    <div className="store_wrapper p-4 flex flex-col justify-center">
      <div className="page_title">
        <h2 className='title'>
          <RiStoreFill />
          Store
        </h2>
        <div className="tite_border"></div>
      </div>

      <StoreTable data={employees} />
    </div>
  )
}
