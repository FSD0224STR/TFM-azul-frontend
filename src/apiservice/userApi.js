

const serverUrl = 'http://localhost:3000'

export const login = async (username, password) => {
    const response = await fetch (`${serverUrl}/users/login`, {method: 'POST', body: JSON.stringify({username, password}), headers: {"content-Type": "application/json"}})
    return await response.json ()
}

export const homePage = async () => {

    const token = localStorage.getItem ('access_token')
    
    const id = localStorage.getItem ('id')
    
    const response = await fetch (`${serverUrl}/users/${id}`, {headers: {"authorization": `Bearer ${token}`}})
    
    const myInfoPage = await response.json()
    
    return myInfoPage
}


