import '../../styles/buttons.css'

export const PrimaryBtn = ({children, label, callback, state=false}) => {
  return (
    <button onClick={callback} className="btn primary_btn" disabled={state}>
      {children}
      <span>{label}</span>
    </button>
  )
}

