import { createPortal } from "react-dom"
import './modalContainer.css'

export const ModalContainer = ({children}) => {
  const portal = window.document.querySelector("#portal")

  return (
    createPortal(
      <div className={`modal_container animate__animated animate__fadeIn`}>
        {children}
      </div>,
      portal
    )
  )
}
