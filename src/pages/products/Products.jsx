import { useEffect, useRef, useState } from "react";
import { 
  RiVerifiedBadgeFill, RiBox3Fill, 
  RiShoppingBasket2Fill,RiFileAddFill 
} from "react-icons/ri";
import { ProductItem } from "../../components/productItem/ProductItem";
import {getProducts} from "../../services/products.service"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad";
import { ProductsListContainer } from "../../containers/productsListContainer/ProductsListContainer";
import {PrimaryBtn} from '../../components/ui/PrimaryBtn'
import { useModal } from "../../hooks/useModal";
import { ModalContainer } from "../../containers/modalContainer/ModalContainer";
import { AddProductModal } from "../../components/addProductModal/AddProductModal";

export const Products = () => {

  const [products, setProducts] = useState([])

  const {isLoading, callEndpoint} = useFetchAndLoad()
  const { showModal, closeModal, isVisible } = useModal()

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

  return (
    <div className="products_wrapper p-4 flex flex-col justify-center">
      <div className="page_title">
        <h2 className='title'>
          <RiVerifiedBadgeFill />
          Productos
        </h2>
        <div className="button_add">
          <PrimaryBtn callback={showModal} label="Agregar">
            <RiFileAddFill/>
          </PrimaryBtn>
        </div>
        <div className="tite_border"></div>
      </div>

      <ProductsListContainer products={products}/>
      {isVisible && <ModalContainer>
        <AddProductModal closeFn={closeModal} />
      </ModalContainer>}
    </div>
  )
}
