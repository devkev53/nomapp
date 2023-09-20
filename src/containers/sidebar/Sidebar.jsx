import './sidebar.css'
import {useAuth} from '../../hooks/useAuth'
import {RiBuilding2Fill, RiUser2Fill, RiLogoutCircleFill} from "react-icons/ri";

export const Sidebar = () => {

  const {user} = useAuth()

  console.log(user)

  return (
    <aside className="sidebar_wrapper">
      <div className="sidebar__content bg-teal-800 h-full">
        <div className="sidebar__user_info">
          <picture>
            <img src={user?.url_img} alt="" />
          </picture>
          <h3 className=' text-xl text-gray-50 font-bold' >{`${user?.name} ${user?.last_name}`}</h3>
          <span className='text-gray-400'>{user?.email}</span>
        </div>
        <div className="sidebar__menu">
          <ul className="menu_list">
            <li className="menu_item">
              <a href="" className="menu_link text-2xl font-bold text-gray-300">
                <RiBuilding2Fill/>
                <span>
                  Empresas
                </span>
              </a>
            </li>
            <li className="menu_item">
              <a href="" className="menu_link text-2xl font-bold text-gray-300">
                <RiUser2Fill/>
                <span>
                  Empleados
                </span>
              </a>
            </li>
            <li className="menu_item">
              <a href="" className="menu_link text-2xl font-bold text-gray-300">
                <RiLogoutCircleFill />
                <span>
                  Salir
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
