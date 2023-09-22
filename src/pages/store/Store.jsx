import { useEffect, useState } from "react"
import { getEmployes } from "../../services/employees.service"

export const Store = () => {

  const [employees, setEmployees] = useState([])

  const fetchEmployes = async () => {
    const result = await getEmployes().then(data=>setEmployees(data))
    
  }

  useEffect(() => {
    fetchEmployes()
  },[])
  return (
    <>
      <div>Store</div>
      <select name="" id="">
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>{employee.name}</option>
        ))}
      </select>
      <button>Validar Compra</button>
    </>
  )
}
