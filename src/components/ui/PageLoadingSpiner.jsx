import '../../styles/loader.css'

export const PageLoadingSpiner = () => {
  return (
    <div className='pageLoaderSpiner__wrapper'>
      <span>Loading..!</span>
      <div className="loader"></div>
    </div>
  )
}
