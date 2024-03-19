import coinImg from '../../assets/img/coin.png'
import './error404.css'

export const Error404 = () => {
  return (
    <div className="error404_wrapper">
      <div className="title">
        <h5>Error</h5>
        <div className="number">
          <h4>4</h4>
          <img className='coinImg' src={coinImg} alt="Coin" />
          <h4>4</h4>
        </div>
        <h5>Not Found</h5>
      </div>
      <div className="message">
        <p>Lo sentimos la pagina que esta buscando no se encuentra en nuestro servidor..!</p>
        <p>Puede probar con alguno de estos enlaces:</p>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
        </ul>
      </div>
    </div>
  )
}
