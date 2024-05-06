import { useEffect, useState } from "react"
import {  homePage } from "../apiservice/userApi"


const MainPage = () => {

    const [userLogged, setUserLogged] = useState ('')
    const [dummy, refresh] = useState(false)

    const getMyUser = async () => {
        const response = await homePage()
        setUserLogged (response)
        console.log ('a ver que es el user', response)
    }

    useEffect (() => {
        getMyUser()
    }, [dummy])

    return (
        <div>
            <h3>SESIÓN INICIADA CON ÉXITO</h3>
            <p>Usuario: {userLogged.username} </p>

        </div>
        
    )
}
export default MainPage