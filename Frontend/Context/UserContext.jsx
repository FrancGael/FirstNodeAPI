import { createContext, useEffect, useState } from "react"
import axios from "axios"


export const userContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(null)
    useEffect(()=>{
        if(!loggedUser){
            axios.get('/users/get-logged-user').then(({data}) =>{
                setLoggedUser(data)
            })
        }
    })

    return (
        <userContext.Provider value={{loggedUser, setLoggedUser}}>
            {children}
        </userContext.Provider>
    )
}