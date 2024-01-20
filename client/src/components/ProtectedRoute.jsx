import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

export default function ProtectedRoute({children}) {
    const {user} = useAuthContext();
    if(user) return <>{children}</>
    else return <Navigate to='/login' />;
}
