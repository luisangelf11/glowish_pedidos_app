import React, { useState } from "react";
import RegisterIMG from "../assets/register.avif";
import GW from '../assets/GW.png'
import '../assets/css/animation.css'
import {Link} from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'

export default function Register() {
    const [form, setForm] = useState({
            correo: '',
            contrasena: '',
            nombre: '',
            apellido: '',
            avatar: '',
            direccion: '',
            telefono: '',
            rol: 'client'
    });

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
            toast.success('Hello!');
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <section className="flex items-center justify-center h-screen w-screen bg-pink-100">
      <div className="flex items-center justify-center h-auto w-auto p-4 shadow-2xl scale-up-center bg-white">
        <div className="flex flex-col items-center p-2">
          <img src={RegisterIMG} alt="register" className="w-96" />
          <p className="text-center text-sm block w-64 p-2 text-slate-800">
            Crea tu cuenta ahora mismo y se parte de la familia Glowish.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center p-2">
        <img src={GW} alt="logo-gw" className=" w-20" />
          <h2 className="uppercase text-red-500 text-xl font-bold">
          ¡Registrate ya!
          </h2>
          <div className="flex justify-center gap-2">
          <div className="flex flex-col">
            <label
              htmlFor="nombre"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-user-circle p-1"></i>
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="Juan"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="apellido"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-user-circle p-1"></i>
              Apellido:
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              value={form.apellido}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="Fernandez"
            />
          </div>
          </div>
          <div className="flex justify-center gap-2">
          <div className="flex flex-col">
            <label
              htmlFor="correo"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-envelope p-1"></i>
              E-mail:
            </label>
            <input
              type="email"
              name="correo"
              id="correo"
              value={form.correo}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="contrasena"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-unlock-alt p-1"></i>
              Contraseña:
            </label>
            <input
              type="text"
              name="contrasena"
              id="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="Contraseña"
            />
          </div>
          </div>
          <div className="flex justify-center gap-2">
          <div className="flex flex-col">
            <label
              htmlFor="telefono"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-phone p-1"></i>
              Teléfono:
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              value={form.telefono}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="829 555-9012"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="direccion"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-map-marked-alt p-1"></i>
              Dirección:
            </label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              value={form.direccion}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="C/Ejemplo #01, Ciudad, Sector"
            />
          </div>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button className="uppercase font-bold text-center text-sm text-white bg-blue-600 h-8 p-2 w-24 rounded transition-all hover:bg-blue-400">
              Registrar
            </button>
            <Link to="/login" className="text-sm w-36 block text-center">
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold text-red-400">Inicia Sesión Ahora.</span>
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </section>
  );
}
