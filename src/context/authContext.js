import {useState, createContext} from 'react'

export const USER_STATES = {
  NOT_KNOW: undefined,
  NOT_LOGGED: null
}

export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(USER_STATES.NOT_KNOW)
  const [user, setUser] = useState(USER_STATES.NOT_KNOW)

  return (
    <AuthContext.Provider value={{
        user, setUser, isLogin, setIsLogin
      }}>
      {children}
    </AuthContext.Provider>
  )
}