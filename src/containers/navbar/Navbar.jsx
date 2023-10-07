import './navbar.css'
import { useAuth } from "../../hooks/useAuth"
import {RiMenu2Fill} from "react-icons/ri";
import {menuSubject} from '../../services/show-menu-subject.service'
import { baseUrl } from '../../utilitys/base-url.utils';

export const Navbar = () => {

  const {user} = useAuth()

  const timestamp = Date.now()
  const now = new Date(timestamp).toLocaleDateString()


  const handleOpenMenu = () => {
    menuSubject.setSubject(true)
  }

  return (
    <nav className="nav_wrapper">
      <div className="nav_content">
        <button onClick={handleOpenMenu} className='nav_open_menu text-4xl' ><RiMenu2Fill/></button>
        <h1 className='title_app'>nomapp <span>| {now}</span></h1>
        <div className="nav_content__user_info">
          <picture>
            {user?.image
              ? (<img className='bg-gray-100 rounded-full' src={`${baseUrl}${user?.image}`} alt="" />) 
              : (<img src={user?.url_img} alt="" />)
            }
          </picture>
          <h3 className=' text-x font-bold' >{`${user?.username}`}</h3>
        </div>
      </div>
    </nav>
  )
}
