import axios from "axios"

export const LoginUser = async (userData,toast,navigate,location) => {
    try {
        const response = await axios.post(`/api/auth/login`, userData)
        console.log(response.data)
        localStorage.setItem('token', response.data.encodedToken)
        localStorage.setItem('userdata', JSON.stringify(response.data.foundUser) )
        toast.success('login succesfully')
        setTimeout(() => {
            navigate(location?.state?.from)
        }, 1000);
    } catch (error) {
        console.error(error)
    }
}
export const SignUpUser = async (userData,toast,navigate,location) => {
    try {
        const response = await axios.post(`/api/auth/signup`, userData)
        console.log(response.data)
        localStorage.setItem('token', response.data.encodedToken)
        localStorage.setItem('userdata', JSON.stringify(response.data.createdUser) )
        toast.success('SignUp succesfully')
        setTimeout(() => {
            navigate(location?.state?.from)
        }, 500);
    } catch (error) {
        console.error(error)
    }
}


export const TestUserLogin = async (toast,navigate,location) => {
    debugger
    const userData = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
    }
    try {
        const response = await axios.post(`/api/auth/login`, userData)
        localStorage.setItem('token', response.data.encodedToken)
        localStorage.setItem('userdata', JSON.stringify(response.data.foundUser) )
        toast.success('login succesfully')
        setTimeout(() => {
            navigate(location?.state?.from)
        }, 1000);
    } catch (error) {
        console.error(error)
    }
}