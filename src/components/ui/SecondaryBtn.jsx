import '../../styles/buttons.css'

export const SecondaryBtn = ({children, label, callback}) => {
  return (
    <button onClick={callback} className="btn secondary_btn">
      {children}
      <span>{label}</span>
    </button>
  )
}
