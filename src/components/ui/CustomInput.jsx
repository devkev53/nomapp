import { useEffect, useState } from "react"


export const CustomInput = ({name, label, type, required, children, onKeyUp}) => {
  const [isEmpty, setIsEmpty] = useState(true)

  const handleCheck = (e) => {
    if (e.target.value === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  return (
    <div className={`input_group2 ${!isEmpty && "no_empty"}`}>
      <input onKeyUp={onKeyUp} onChange={handleCheck} type={type} name={name} required={required} />
      <label className="input_group2__label">{label}{children}</label>
      <div className="input_group2__underline"></div>
    </div>
  )
}
