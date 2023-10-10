import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {

    const [ user, setUser ] = useState({})
    const [isLogged, setIsLogged] = useState(false)

    const handleLogin = ( userLogged ) => {
      setUser(userLogged)
      setIsLogged(true)

    }

    const handleLogout = () => {
      setUser({})
      setIsLogged(false)
    }

    
    let data = {
        user, 
        isLogged,
        handleLogin,
        handleLogout
    }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;