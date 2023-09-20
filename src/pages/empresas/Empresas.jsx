import { useEffect, useState } from "react"
import { AsyncTable } from "../../containers/asyncTable/AsyncTable"
import { getUsers } from "../../services/users.service"

export const Empresas = () => {

  const [data, setData] = useState([])

  const handleFetchUsers = async () => {
    try {
      const response = await getUsers()
      setData(response)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setData(handleFetchUsers)
  },[])

  console.log(data)

  return (
    <>
      <h1>Empresas</h1>
      <AsyncTable res={data} />
    </>
  )
}
