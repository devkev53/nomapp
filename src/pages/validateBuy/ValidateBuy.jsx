import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RiVerifiedBadgeFill, RiBox3Fill } from "react-icons/ri";

import {getProducts} from "../../services/products.service"

import { CustomInput } from "../../components/ui/CustomInput";

import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import {useStoreContext} from '../../hooks/useStoreState'
import './validate_buy.css'
import { PageLoadingSpiner } from "../../components/ui/PageLoadingSpiner";
import Autocomplete from "../../containers/autocomplete/Autocomplete";
import { TableItemDetail } from "../../containers/tableItemDetail/TableItemDetail";
import { EmployeeInfo } from "../../components/employeeInfo/EmployeeInfo";

export const ValidateBuy = () => {

  const [products, setProducts] = useState([])
  const [productsFilter, setProductsFilter] = useState([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const {addToShop, state} = useStoreContext()

  const getProductsData = async () => {
    try {
      let response = await callEndpoint(getProducts())
      setProducts(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getProductsData()
  },[])


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
    showAutocomplete && search(value)
  }

  const clickProduct = (item) => {
    // console.log(item)
    const inputSearch = document.querySelector('[name="search_products"]')
    addToShop(item)
    inputSearch.value = ''
    setShowAutocomplete(false)
  }

  return (
    <div className='validate_buy_wrapper'>
      {isLoading && <PageLoadingSpiner />}
      <div className="page_title">
        <h2 className='title'>
          <RiVerifiedBadgeFill />
          Validar Compra
        </h2>
        <div className="tite_border"></div>
      </div>

      <EmployeeInfo />

      <div className="detail_shop_products">
        <div className="title_card">
          <h3>
            <RiBox3Fill/>
            Detalle de Productos
          </h3>
        </div>

        <div className="body_card">

            <div className="search_product">
              <CustomInput name='search_products' label="Buscar Productos" onKeyUp={hadleKeyUp}/>
              {showAutocomplete && <Autocomplete callback={clickProduct} data={productsFilter}/>}
            </div>

            <div className="table_content_wrapper">
              <TableItemDetail cart={state.cart} />
            </div>

        </div>

      </div>
    </div>
  )
}
