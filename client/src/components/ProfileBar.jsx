import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import userIcon from '../assets/userIcon.jpg'
import '../assets/css/animation.css'

export default function ProfileBar() {
  const [subMenu, setSubMenu]= useState(false);
  const { user, logout } = useAuthContext();
  return user !== null ? (
    <div>
        <div className="flex gap-2 justify-center items-center p-2 cursor-pointer"  onClick={()=> setSubMenu(subMenu ? false : true)}>
        {user.Avatar === '' || user.Avatar === null ? <img src={userIcon} alt="Icon user" className="w-10 rounded-full object-cover h-10" /> : <img src={user.Avatar} alt="Profile" className="w-10 rounded-full object-cover h-10"/>}
        <div>
            <h3 className="text-md text-red-400 font-semibold">{user.Nombre} {user.Apellido}</h3>
            <p className="text-sm font-semibold text-slate-500">{user.Correo}</p>
        </div>
    </div>
    {subMenu && <div style={{
      zIndex: 1000
    }} className="scale-up-center transition-all flex flex-col shadow-xl rounded-md justify-center items-start fixed w-52 bg-white mt-2">
        <Link to='/perfil' className="p-2 border-b w-full text-gray-600 transition-all hover:text-red-400">
        <i className="fas fa-user-alt p-1"></i>Perfil</Link>
        <Link to='/pedidos' className="p-2 border-b w-full text-gray-600 transition-all hover:text-red-400"><i className="fas fa-truck p-1"></i> Pedidos</Link>
        <Link to='/ayuda' className="p-2 border-b w-full text-gray-600 transition-all hover:text-red-400"><i className="fas fa-question p-1"></i>Ayuda</Link>
        <button onClick={()=> logout()} className="p-2 border-b w-full text-gray-600 transition-all hover:text-red-400 text-left"><i className="fas fa-sign-out-alt p-1"></i>Cerrar Sesión</button>
    </div>}
    </div>
  ) : (
    <div className="flex gap-2">
      <Link to="/login" className="bg-red-500 h-10 text-white font-semibold p-2 text-sm rounded-sm transition-all hover:bg-red-400"><i className="fas fa-sign-in-alt p-1"></i>Iniciar Sesión</Link>
      <Link to="/register" className="border-2 h-10 border-red-500 text-black font-semibold text-sm p-2 rounded-sm transition-all hover:bg-red-400 hover:border-red-400 hover:text-white"><i className="fas fa-user p-1"></i>Registrarse</Link>
    </div>
  );
}
