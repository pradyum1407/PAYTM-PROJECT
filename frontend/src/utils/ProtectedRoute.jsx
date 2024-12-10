import React, { useEffect } from 'react'
import { Outlet,Navigate} from 'react-router-dom'

export const ProtectedRoute = () => {

 const token = localStorage.getItem("authtoken")
return token? <Outlet/> : <Navigate to="/signin"/>
    
}
