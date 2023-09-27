import '../../styles/buttons.css'

export const PrimaryBtn = ({children, label, callback}) => {
  return (
    <button onClick={callback} className="btn primary_btn">
      {children}
      <span>{label}</span>
    </button>
  )
}

