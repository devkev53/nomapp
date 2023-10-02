import { useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from "react-icons/ri";


import noImg from '../../assets/img/not-img.jpg'
import {useStoreContext} from '../../hooks/useStoreState'

export const ItemTableDetail = ({item}) => {

  const [cant, setCant] = useState(1)

  const {updateCant, removeToShop} = useStoreContext()

  const handleChangeTotalForCant = (cant) => {
    updateCant(item, cant)
  }

  const handleChangeCant = (e) => {
    if (e.target.value >= 1) {
      setCant(e.target.value)
      handleChangeTotalForCant(e.target.value)
    }
  }

  return (
    <tr key={item.id} className='item_row' id={item.id}>
      <td className='deleteBtn'>
        <button onClick={()=>removeToShop(item)}>
          <RiDeleteBin7Fill/>
        </button>
      </td>
      <td width="100%" className="product">
        <img src={`${item.url_img !== '' ? ('http://127.0.0.1:8000'+item.url_img) : noImg }`} alt="" />
        <span>{item.name}</span>
      </td>
      <td width="100%">
        <input
          value={cant}
          min="1"
          onChange={handleChangeCant}
          className={`cantidad item_number_id_${item.id}`} 
          type="number" 
        />
      </td>
      <td width="100%">Q. <span id='price_prod'>{item.price}</span></td>
      <td width="100%" id='total_for_cant'>Q. <span>{item.total}</span></td>
    </tr>
  )
}
