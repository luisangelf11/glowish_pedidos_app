import React from 'react'
import IMGWelcome from "../assets/welcome.jpg"
import {useAuthContext} from '../context/authContext'
import "../assets/css/animation.css"

export default function Welcome() {
    const {user} = useAuthContext();
  return (
    <div className='bg-white p-2 rounded-xl shadow-xl flex flex-col items-center scale-up-center'>
        <img src={IMGWelcome} alt="Welcome" className='w-96 object-cover'/>
        <h2 className='text-center text-xl font-bold text-red-500 uppercase w-80 p-2'>Bienvenida a tu tienda virtual Glowish Fashion</h2>
        <h3 className='text-sm font-semibold text-gray-600'>{user.Nombre} {user.Apellido}</h3>
    </div>
  )
}
