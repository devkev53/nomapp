import './layout.css'
import { Sidebar } from "../sidebar/Sidebar"
import { Navbar } from '../navbar/Navbar'

export const Layout = ({children}) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="right_content">
        <Navbar/>
        <main className='main_content'>
          {children}
        </main>
      </div>
    </div>
  )
}
