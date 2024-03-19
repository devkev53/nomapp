import { useEffect, useState } from 'react'
import {verifyNoEmpty} from '../../utilitys/verify-no-empty.utils'

export const CustomInputEdit = ({val, label, required, type, name}) => {
  const [value, setValue] = useState(val)

  useEffect(() => {
    verifyNoEmpty()
  },[value])

  return (
    <div className="input_group2">
      <input 
        type={type} 
        name={name} 
        className="input_group2__input"
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)} 
      />
      <label htmlFor="" className="input_group2__label">{label}</label>
      <div className="input_group2__underline"></div>
    </div>
  )
}
