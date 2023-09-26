import { useEffect } from "react"

export const useAsync = (
  asyncFn,
  successFunction,
  returnFunction,
  dependencies
) => {
  useEffect(() => {
    let isActive = true // Inicia el componente
    asyncFn().then((result) => { // Envia la peticion
      if (isActive) successFunction(result.data) // Valida si el componente esta activo
    })
    return () => {
      returnFunction && returnFunction() // Si existe na funcino de retorno la ejecuta
      isActive = false // La asigna si el componente se desmonto
    }
  }, dependencies)
}