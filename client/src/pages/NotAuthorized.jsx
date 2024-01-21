import React from 'react'
import imgPrivate from '../assets/restringida.gif'
import {  useNavigate } from "react-router-dom";
import '../assets/css/animation.css'
import { useAuthContext } from "../context/authContext";

export default function NotAuthorized() {
    const navigate = useNavigate();
    const {user} = useAuthContext();
  
    const handleClick =(e)=>{
      if(user.Rol === 'admin') navigate('/dashboard');
      else navigate('/');
  
    }
  
    return (
      <section
        className="h-screen w-screen flex justify-center items-center flex-col overflow-hidden"
      >
        <img
          src={imgPrivate}
          alt="private-route"
          style={{ width: "400px" }}
          className="object-cover scale-up-center"
        />
        <h2 className="font-bold text-xl uppercase text-red-800 p-2 scale-up-center">
          Sin acceso a esta ruta
        </h2>
        <p className='scale-up-center text-center'>La ruta a la que estás tratando de acceder se encuentra restringida. <br />Es decir, no puedes acceder a ella al menos que tengas los permisos correspondientes.</p>
        <button
        onClick={handleClick}
          className="p-2 bg-red-500 rounded scale-up-center text-white mt-2  transition-all hover:bg-red-400"
        >
          <i className="fas fa-hand-point-left p-1"></i>Regresar
        </button>
      </section>
  )
}
