import './navbar.css'
import { useAuth } from "../../hooks/useAuth"
import {RiMenu2Fill, RiArrowDownSFill, RiUser5Fill, RiKey2Fill, RiLogoutCircleFill} from "react-icons/ri";
import {menuSubject} from '../../services/show-menu-subject.service'
import { baseUrl } from '../../utilitys/base-url.utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useModal} from '../../hooks/useModal'
import {ChangePassModal} from '../../components/changePassModal/ChangePassModal'
import {ModalContainer} from '../../containers/modalContainer/ModalContainer'

export const Navbar = () => {

  const [showOptions, setShowOptions] = useState(false)

  const timestamp = Date.now()
  const navigate = useNavigate()
  const {user, handleLogout} = useAuth()
  const now = new Date(timestamp).toLocaleDateString()
  const {isVisible, showModal, closeModal} = useModal()


  const handleOpenMenu = () => {
    menuSubject.setSubject(true)
  }

  return (
    <nav className="nav_wrapper">
      {isVisible && <ModalContainer>
        <ChangePassModal closeFn={closeModal}/>
      </ModalContainer>}
      <div className="nav_content">
        <button onClick={handleOpenMenu} className='nav_open_menu text-4xl' ><RiMenu2Fill/></button>
        <h1 className='title_app'>nomapp <span>| {now}</span></h1>
        <div className="nav_content__user_info">
          
          <button 
            className='nav_content__user_info__btn'
            onClick={()=>setShowOptions(!showOptions)}
          >
            <picture>
              {user?.image
                ? (<img className='bg-gray-100 rounded-full' src={`${baseUrl}${user?.image}`} alt="" />) 
                : (<img src={user?.url_img} alt="" />)
              }
            </picture>
            <h3 className=' text-x font-bold'>
              {`${user?.username}`}
            </h3>
            <RiArrowDownSFill/>
          </button>
          
          <div className={`${showOptions && 'show'} user_options`}>
            <button onClick={() => {setShowOptions(false), navigate('/my-profile')}}>
              <RiUser5Fill/>
              <span>
                Perfil
              </span>
            </button>
            <button onClick={showModal}>
              <RiKey2Fill/>
              <span>
                Cambiar Contraseña
              </span>
            </button>
            <button onClick={handleLogout}>
              <RiLogoutCircleFill/>
              <span>
                Salir
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
