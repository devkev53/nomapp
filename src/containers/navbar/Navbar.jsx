import './navbar.css'
import { useAuth } from "../../hooks/useAuth"
import {RiMenu2Fill} from "react-icons/ri";
import {menuSubject} from '../../services/show-menu-subject.service'

export const Navbar = () => {

  const {user} = useAuth()

  const handleOpenMenu = () => {
    menuSubject.setSubject(true)
  }

  return (
    <nav className="nav_wrapper">
      <div className="nav_content">
        <button onClick={handleOpenMenu} className='nav_open_menu text-4xl' ><RiMenu2Fill/></button>
        <h1>nomapp</h1>
        <div className="nav_content__user_info">
          <picture>
            {user?.image
              ? (<img className='bg-gray-100 rounded-full' src={`http://127.0.0.1:8000${user?.image}`} alt="" />) 
              : (<img src={user?.url_img} alt="" />)
            }
          </picture>
          <h3 className=' text-x font-bold' >{`${user?.username}`}</h3>
        </div>
      </div>
    </nav>
  )
}
