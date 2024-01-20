import React from 'react'
import { useAuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom';

export default function ClientRoutes({children}) {
    const {user} =useAuthContext();
    if(user.Rol === 'client') return <>{children}</>
    else return <Navigate to='/' />
}
