import { useEffect, useRef, useState } from "react"
import { baseUrl } from "../../utilitys/base-url.utils"

export const CustomEditImagenInput = ({data, name}) => {

  const [preview, setPreview] = useState('')
  const inputImgRef = useRef()

  const handleChange = (e) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      const reader = new FileReader(e.target.files[0])
      reader.onload = (e) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setPreview(notImage)
    }
  }


  const handleImgClick = () => {
    console.log(inputImgRef.current.click())
  }

  useEffect(()=>{
    setPreview(`${baseUrl}${data}`)
  },[])

  return (
    <div className="image_input" onClick={handleImgClick}>
      <picture>
        <img src={preview} alt="" className="image_input__img" />
        <input
          onChange={handleChange}
          ref={inputImgRef}
          name={name}
          className="image_input__input"
          type="file"
        />
      </picture>
    </div>
  )
}
