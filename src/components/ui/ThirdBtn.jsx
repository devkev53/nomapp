import '../../styles/buttons.css'

export const ThirdBtn = ({children, label, callback, state=false, addClass}) => {
  return (
    <button onClick={callback} className={`${addClass} btn third_btn`} disabled={state}>
      {children}
      <span>{label}</span>
    </button>
  )
}
