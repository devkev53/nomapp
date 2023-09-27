import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiVerifiedBadgeFill, RiBox3Fill } from "react-icons/ri";

import { getOneEmploye } from "../../services/employees.service";
import {getProducts} from "../../services/products.service"

import noImg from '../../assets/img/not-img.jpg'
import { CustomInput } from "../../components/ui/CustomInput";

import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import './validate_buy.css'
import { getActiveWordToken } from "../../utilitys/getActiveWordToken";
import { PageLoadingSpiner } from "../../components/ui/PageLoadingSpiner";
import Autocomplete from "../../containers/autocomplete/Autocomplete";

export const ValidateBuy = () => {

  const [employe, setEmployee] = useState({})
  const [products, setProducts] = useState([])
  const [productsFilter, setProductsFilter] = useState([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()

  const getEmployeData = async (id) => {
    const resutl = await getOneEmploye(id).then(value => setEmployee(value))
    return resutl
  }

  const getProductsData = async () => {
    try {
      let response = await callEndpoint(getProducts())
      setProducts(response.data)
    } catch (e) {
      console.error(e)
    }
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

  useEffect(() => {
    getProductsData()
  },[])

  const return_aviable = () => {
    if (get_day() >= 28 || get_day() < 14) {
      return employe?.calculate_prepaid
    } else{
      return employe?.calculate_monthPayment
    }
  }

  const search = (value) => {
    let words = value.toLowerCase().split(' ')
    let filterProds = []
    words.forEach(word => {
      let filter = products.filter(prod => prod.name.toLowerCase().includes(word))
      filterProds = filterProds.concat(filter)
    });
    setProductsFilter(filterProds)
  }

  const hadleKeyUp = (e) => {
    const {value} = e.target

    value.length >= 2 ? setShowAutocomplete(true) : setShowAutocomplete(false)
    // const { word } = getActiveWordToken(value, selectionEnd)
    // const shouldOpentAutocomplete = /^\w{3,25}$/.test(value)
    // setShowAutocomplete(shouldOpentAutocomplete)
    showAutocomplete && search(value)
  }

  const clickProduct = (e) => {
    console.log(e)
  }

  // console.log(products)
  return (
    <div className='validate_buy_wrapper'>
      {!isLoading && <PageLoadingSpiner />}
      <div className="page_title">
        <h2 className='title'>
          <RiVerifiedBadgeFill />
          Validar Compra
        </h2>
        <div className="tite_border"></div>
      </div>

      <div className="employee_data">
        <img className="store_img_employee rounded-full"
          src={`${employe.url_img !== "" ? `http://127.0.0.1:8000${employe.url_img}` : noImg}`} alt="" />
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

      <div className="detail_shop_products">
        <div className="title_card">
          <h3>
            <RiBox3Fill/>
            Detalle de Productos
          </h3>
        </div>

        <div className="body_card">
            <div className="search_product">
              <CustomInput label="Buscar Productos" onKeyUp={hadleKeyUp}/>
              {showAutocomplete && <Autocomplete callback={clickProduct} data={productsFilter}/>}
            </div>
          </div>
      </div>
    </div>
  )
}
