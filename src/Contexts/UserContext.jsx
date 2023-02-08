import { useState } from "react";
import { useContext, 
        createContext ,
        useEffect
    } from "react"

 import { getCurrentUser } from "../helpers";   

const UserContext=createContext({
    user:{}
});

export const useUser = () => useContext(UserContext)

export const UserProvider = ({children}) => {

    const [user, setUser] = useState({})


    useEffect(()=>{
        const user = getCurrentUser()

        setUser(user)
    },[])

    return (
        <UserContext.Provider 
             value = {{currentUser:user}}
        >
            {children}
        </UserContext.Provider>
    )
}