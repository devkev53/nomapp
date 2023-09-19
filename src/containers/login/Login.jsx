import './login.css'
import icon from '../../assets/img/payIcon.png'

export const Login = () => {
  return (
    <main className="main font-sans bg-gradient-to-tr from-purple-500 to-pink-500">
      <div>
        <picture className='icon_container bg-gray-50 rounded-full'>
          <img className='icon' src={icon} alt="" />
        </picture>
        <form action="" className="form_content rounded justify-center bg-gray-50">
          <h3 className='font-bold text-2xl'>Iniciar Sesión</h3>
          <div className="input_group">
            <label htmlFor="">Usuario</label>
            <input type="text" />
          </div>
          <div className="input_group">
            <label htmlFor="">Contraseña</label>
            <input type="text" />
          </div>
          <button className='bg-yellow-500 w-full rounded py-2 hover:bg-yellow-400 font-bold'>Ingresar</button>
          <a href="">Recuperar Contraseña</a>
        </form>
      </div>
    </main>
  )
}
