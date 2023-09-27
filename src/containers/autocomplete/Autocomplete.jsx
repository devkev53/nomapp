
import noImg from '../../assets/img/not-img.jpg'

import './autocomplete.css'

const Autocomplete = ({data, callback}) => {
  return (
    <div className='autoComplete_wrapper'>
      {data.map(({id, name, price, url_img}) => (
        <button onClick={callback} key={id} className='item'>
          <picture>
            <img src={`${url_img !== '' ? ('http://127.0.0.1:8000'+url_img) : noImg }`} alt="" />
          </picture>
          <div className="info">
            <p>{name}</p>
            <p>Q. {price}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default Autocomplete