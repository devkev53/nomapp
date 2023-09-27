import '../../styles/buttons.css'

export const SecondaryBtn = ({children, label, callback, state=false}) => {
  return (
    <button onClick={callback} className="btn secondary_btn" disabled={state}>
      {children}
      <span>{label}</span>
    </button>
  )
}
