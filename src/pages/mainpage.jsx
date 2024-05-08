import { useEffect, useState } from "react"
import {  homePage } from "../apiservice/userApi"
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

    const [userLogged, setUserLogged] = useState ('')
    const [dummy, refresh] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate ()

    const getMyUser = async () => {

        const response = await homePage()

        if (response.username) setUserLogged (response)
        else setError (response.message)

        console.log ('a ver cual es la respuesta', response)
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate ('/')
    } 

    const handleBackToLogin = () => {
        navigate ('/')
    }

    useEffect (() => {
        getMyUser()
    }, [dummy])

    return (
        <div>
            { userLogged.username && <h3>SESIÓN INICIADA CON ÉXITO</h3>}
            {userLogged.username && <p>Usuario: {userLogged.username} </p>}
            {error && <Alert type="error" message={`Error al iniciar sesión: ${error}`} banner />}
            {error && <Button type="primary" htmlType="submit" onClick={handleBackToLogin}  block>
            Volver a iniciar sesión
            </Button>}
            {userLogged.username && <Button type="primary" htmlType="submit" onClick={handleLogout}  block>
            Cerrar sesión
            </Button>}
        </div>
        
    )
}
export default MainPage