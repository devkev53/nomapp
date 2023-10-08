import noImg from '../../assets/img/not-img.jpg'
import { baseUrl } from '../../utilitys/base-url.utils'


export const ProductItem = ({id, name, description, price, img}) => {
  return (
    <div className='item_product'>
      <picture>
        <img src={`${img !== '' ? (baseUrl+img) : noImg}`} alt={name} />
      </picture>
      <div className="product_info">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="price">Q. {price}</div>
      </div>
    </div>
  )
}
