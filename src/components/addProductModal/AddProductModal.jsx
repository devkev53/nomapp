import { useRef, useEffect, useState } from "react";
import { RiVerifiedBadgeFill, RiCloseCircleFill, RiSave3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import {CustomInput} from '../ui/CustomInput'
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { PrimaryBtn } from "../../components/ui/PrimaryBtn"
import {PageLoadingSpiner} from '../../components/ui/PageLoadingSpiner'
import { addProduct } from "../../services/products.service";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CustomTexarea } from "../ui/CustomTexarea";
import { CustomImageInput } from "../ui/CustomImageInput";

export const AddProductModal = ({closeFn}) => {

  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const formRef = useRef()
  const {isLoading, callEndpoint} = useFetchAndLoad()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    console.log(data)
    fetchAddProduct(data)
  }

  const endAddProductOk  = () => MySwal.fire({
    title: 'Realizado con Exito..!',
    icon: 'success',
  }).then((result) => {
    navigate(0)
  })
  const endPaymentNominaConflict = () => MySwal.fire({
    title: 'Oops..!',
    icon: 'error',
    html: <div><p>No fue posible agregar el producto verifique con el administrador del sistema..!</p></div>
  })

  const fetchAddProduct = async (data) => {
    try {
      let response = await callEndpoint(addProduct(data))
      endAddProductOk()
      return response.data
    } catch (e) {
      endPaymentNominaConflict()
    }
  }


  return (
    <div className="card_modal addProductItemModal">
      {isLoading && <PageLoadingSpiner/>}

      <div className="title">
        <h3>
          <RiVerifiedBadgeFill />
          <span>Registrar Producto</span>
        </h3>
        <button onClick={closeFn} className="close_btn">
          <RiCloseCircleFill/>
        </button>
      </div>
      <div className="body">
        <form ref={formRef} onSubmit={handleSubmit}>
          <CustomImageInput name="image" />
          <div className="row">
            <CustomInput label="Nombre" name="name" />
            <CustomInput label="Precio" name="price" />
          </div>
          <CustomTexarea label="Descripcón" name="description" />
          
          <PrimaryBtn label="Guardar" type="submit">
            <RiSave3Fill/>
          </PrimaryBtn>
        </form>
      </div>
      {/* <div className="footer"></div> */}
    </div>
  )
}
