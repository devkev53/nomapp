import React, { useEffect, useState } from 'react'
import { verifyNoEmpty } from '../../utilitys/verify-no-empty.utils'

export const CustomTextEdit = ({val, label, required, type, name}) => {
  const [value, setValue] = useState(val)

  useEffect(() => {
    verifyNoEmpty()
  },[value])
  return (
    <div className="text_group">
      <textarea 
        type={type} 
        name={name} 
        className="text_group__textarea"
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)} 
      />
      <label htmlFor="" className="text_group__label">{label}</label>
      <div className="text_group__underline"></div>
    </div>
  )
}
