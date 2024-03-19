import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './tableItemDetail.css'

import { useFetchAndLoad } from '../../hooks/useFetchAndLoad';

import {RiShoppingBasketFill, RiErrorWarningFill} from "react-icons/ri";
import { ItemTableDetail } from '../../components/itemTableDetail/ItemTableDetail'
import { SecondaryBtn } from "../../components/ui/SecondaryBtn";
import {useStoreContext} from '../../hooks/useStoreState'
import { useParams } from 'react-router-dom';
import {createSale} from '../../services/store.service'
import { useNavigate } from 'react-router-dom';

export const TableItemDetail = ({cart}) => {

  const [total, setTotal] = useState(0)
  const [check, setChek] = useState(true)
  const {state, resetShop} = useStoreContext()
  const {isLoading, callEndpoint} = useFetchAndLoad()
  const params = useParams()
  const navigate = useNavigate()
  const SuccessSwall = withReactContent(Swal)

  const transformData = () => {
    let productsData = new Array()
    cart.forEach(item => {
      let prod = {
        "product": item.id,
        "amount": item.cant
      }
      productsData.push(prod)
    });
    return {
      employee: parseInt(params.employeeId),
      detail: productsData
    }
  }

  const handleCreateShop = async () => {
    const data = transformData()
    console.log(JSON.stringify(data))
    try {
      let response = await callEndpoint(createSale(data))
      SuccessSwall.fire({
        icon: 'success',
        title: <p>Compra realziada con exito..!</p>
      }).then(result => {
        resetShop()
        navigate('/store')
      })
    } catch (e) {
      console.error(e)
    }
  }

  const calculateTotal = () => {
    let disponible = document.querySelector('.disponible')
    disponible = disponible.innerHTML.slice(2,)
    let total = 0
    state.cart.map(item => {
      total += item.total
    })
    setTotal(total)
    if (total >= parseFloat(disponible)) {
      setChek(false)
    } else {
      setChek(true)
    }
  }


  useEffect(()=>{
    calculateTotal()
  },[state.cart])


  return (
    <>
      {cart.length >= 1 
        ? (
          <>
          <div className="table_content">

            <table className="table_detail_items">
              <thead>
                <tr>
                  <th>Eliminar</th>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio Unidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <ItemTableDetail key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="total_footer">
            <p>Total Q. <span>{total}</span></p>
          </div>

          {check
            ? <SecondaryBtn callback={handleCreateShop} label="Generar">
                <RiShoppingBasketFill/>
              </SecondaryBtn>
            : (
              <div className="warning_total">
                <RiErrorWarningFill/>
                <div>
                  <p>Verifique el total de su compra..!</p>
                  <p>Excede el disponible </p>
                </div>
              </div>
            )
          }

          </>
        )
        : (
          <div className="">agrege un producto..!</div>
        )
      }

    </>
  )
}
