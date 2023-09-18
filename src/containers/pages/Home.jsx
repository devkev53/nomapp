import axios from "axios"
import { useEffect, useState } from "react"

export const Home = () => {

  const [users,setUsers] = useState([])

  const getUsers = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/users/')
    setUsers(response.data)
  }
  console.log(users)

  return (
    <div>
      <h1>My App</h1>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.email}</li>
        ))}
      </ul>
      <button onClick={getUsers}>Get Users..!</button>
    </div>
  )
}
