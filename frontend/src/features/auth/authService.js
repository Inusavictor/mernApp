import axios from 'axios'

const API_URL = 'https://mern-api-7w3a.onrender.com/api/users/'

const login = async (userData) => {
    const response = await axios.post(API_URL+'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//register
const register = async (userData) => {
    const response = await axios.post(API_URL+'register', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

//logout
const logout = () => {
    localStorage.removeItem('user')
}


export const authService = { login, register, logout }
 