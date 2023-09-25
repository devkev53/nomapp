import { useEffect, useState } from "react"

export const CustomTexarea = ({name, label}) => {
  const [isEmpty, setIsEmpty] = useState(true)

  const handleCheck = (e) => {
    if (e.target.value === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  return (
    <div className={`text_group ${!isEmpty && "no_empty"}`}>
      <textarea className="" name={name} onChange={handleCheck} />
      <label className="text_group__label" >{label}</label>
      <div className="text_group__underline"></div>
    </div>
  )
}
