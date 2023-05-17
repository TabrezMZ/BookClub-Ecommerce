import axios from "axios"

export const LoginUser = async (userData) => {
    try {
        const response = await axios.post(`/api/auth/login`, userData)
        console.log(response.data)
        localStorage.setItem('token', response.data.encodedToken)
    } catch (error) {
        console.error(error)
    }
}
export const SignUpUser = async (userData) => {
    try {
        const response = await axios.post(`/api/auth/signup`, userData)
        console.log(response.data)
        localStorage.setItem('token', response.data.encodedToken)
    } catch (error) {
        console.error(error)
    }
}


export const TestUserLogin = async () => {
    const userData = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
    }
    try {
        const response = await axios.post(`/api/auth/login`, userData)
        console.log(response.data)
        localStorage.setItem('token', response.data.encodedToken)
    } catch (error) {
        console.error(error)
    }
}