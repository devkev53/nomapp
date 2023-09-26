import { RiSearchLine} from "react-icons/ri";
import { useState } from "react";

import {CustomInput} from '../../components/ui/CustomInput'

export const CustomGobalFilter = ({label, icon, globalFilter, setGlobalFilter}) => {

  const [isEmpty, setIsEmpty] = useState(true)

  const handleCheck = (e) => {
    setGlobalFilter(e.target.value)
    if (e.target.value === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  return (
    <div>
      <div className={`input_group2 ${!isEmpty && "no_empty"}`}>
        <input onChange={handleCheck} value={globalFilter || ''} type="text" name="search" />
        <label className="input_group2__label">
          <RiSearchLine/>
          {label}
        </label>
        <div className="input_group2__underline"></div>
      </div>
    </div>
  )
}
