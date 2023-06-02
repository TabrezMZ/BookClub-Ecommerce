import { Navigate, useLocation } from "react-router-dom"

export const RequireedAuth = ({ children }) => {
    const token = localStorage.getItem('token')
    const location = useLocation()
    return (
        token ? children : <Navigate to='/login' state={{ from: location?.pathname }} />
    )
}