import React, { useState } from "react";
import Logo from "../assets/GW.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import ProfileBar from "./ProfileBar";

export default function MenuUser() {
  const [form, setForm] = useState({
    find: "",
  });

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    navigate(`/catalogo?search=${form.find}`);
  }

  return (
    <nav className="flex justify-around gap-2 items-center shadow-md w-full fixed bg-white" style={{
      zIndex: 1000
    }}>
      <img className="w-14 object-cover" src={Logo} alt="GW" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="find"
          value={form.find}
          onChange={handleChange}
          placeholder="Buscar..."
          className="w-96 border text-sm rounded-xl p-1 transition-all outline-none focus:border-2 focus:border-blue-600"
        />
        <button className="p-2 text-sm ml-2 bg-red-400 text-white text-center rounded-full h-10 w-10 transition-all hover:bg-red-300">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `text-gray-500 font-semibold transition-all hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
              : `text-red-500 font-semibold transition-all  hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
          }
          reloadDocument
        >
          <i className="fas fa-home p-1"></i>
          Inicio
        </NavLink>
        <NavLink
          to="/catalogo"
          className={({ isActive }) =>
            isActive
            ? `text-gray-500 font-semibold transition-all hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
            : `text-red-500 font-semibold transition-all  hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
          }
          reloadDocument
        >
          <i className="fas fa-tshirt p-1"></i>
          Productos
        </NavLink>
        <NavLink
          to="/nuevos-productos"
          className={({ isActive }) =>
            isActive
            ? `text-gray-500 font-semibold transition-all hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
            : `text-red-500 font-semibold transition-all  hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
          }
        >
          <i className="fas fa-newspaper p-1"></i>
          Nuevos
        </NavLink>
        <NavLink
          to="/lista-categorias"
          className={({ isActive }) =>
            isActive
            ? `text-gray-500 font-semibold transition-all hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
            : `text-red-500 font-semibold transition-all  hover:text-red-400 text-sm p-1 hover:border-red-400 border-b-2 border-white`
          }
        >
          <i className="fas fa-layer-group p-1"></i>
          Categorías
        </NavLink>
      </div>
      <ProfileBar />
    </nav>
  );
}
