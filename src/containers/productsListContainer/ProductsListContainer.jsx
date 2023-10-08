import React from 'react'
import { ProductItem } from '../../components/productItem/ProductItem'
import './productsListContainer.css'

export const ProductsListContainer = ({products}) => {
  return (
    <div className='products_list_container'>
      {products.map(product => (
        <ProductItem 
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          img={product.url_img}
        />
      ))}
    </div>
  )
}
