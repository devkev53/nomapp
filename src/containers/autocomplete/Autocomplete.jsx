
import noImg from '../../assets/img/not-img.jpg'
import { baseUrl } from '../../utilitys/base-url.utils'

import './autocomplete.css'

const Autocomplete = ({data, callback}) => {
  return (
    <div className='autoComplete_wrapper'>
      {data.length <= 0 
        ? (<p>No se encontraro productos..!</p>)
        : data.map(product => (
        <button onClick={() => callback(product)} key={product.id} className='item'>
          <picture>
            <img src={`${product.url_img !== '' ? (baseUrl+product.url_img) : noImg }`} alt="" />
          </picture>
          <div className="info">
            <p>{product.name}</p>
            <p>Q. {product.price}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Autocomplete