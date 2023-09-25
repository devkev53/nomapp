import { useRef, useState } from 'react'
import notImage from '../../assets/img/not-img.jpg'

export const CustomImageInput = ({name, type}) => {

  const [preview, setPreview] = useState(notImage)

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

  return (
    <div onClick={handleImgClick} className="image_input">
      <picture>
        <img className="image_input__img" src={preview} alt="" />
        <input onChange={handleChange} ref={inputImgRef} name={name} className="image_input__input" type="file" />
      </picture>
    </div>
  )
}
