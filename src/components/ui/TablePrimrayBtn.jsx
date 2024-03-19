import '../../styles/buttons.css'

export const TablePrimrayBtn = ({children, label, callback}) => {
  return (
    <button onClick={callback}>
      {children}
      <span>{label}</span>
    </button>
  )
}
