import { Sidebar } from "../sidebar/Sidebar"

export const Layout = ({children}) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <nav className="navbar"><h3>Navar section</h3></nav>
      </div>
      <main>
        {children}
      </main>
    </div>
  )
}
