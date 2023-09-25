import { useRef } from 'react'
import notImage from '../../assets/img/not-img.jpg'

export const CustomImageInput = ({name, type}) => {

  const inputImgRef = useRef()

  const handleImgClick = () => {
    console.log(inputImgRef.current.click())
  }

  return (
    <div onClick={handleImgClick} className="image_input">
      <picture>
        <img className="image_input__img" src={notImage} alt="" />
        <input ref={inputImgRef} name={name} className="image_input__input" type="file" />
      </picture>
    </div>
  )
}
