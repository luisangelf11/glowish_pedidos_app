import React from 'react'
import { useAuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom';

export default function AdminRoutes({children}) {
    const {user} =useAuthContext();
    if(user.Rol === 'admin') return <>{children}</>
    else return <Navigate to='/ruta-privada' />
}
