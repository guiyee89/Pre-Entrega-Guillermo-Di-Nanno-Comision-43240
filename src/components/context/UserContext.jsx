import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ( {children} ) => {

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")) || [])

    let data = {
        user, 
        setUser
    }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;