/* eslint-disable no-unused-vars */
import LoginIMG from "../assets/login-bg.png";
import GW from "../assets/GW.png";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/animation.css";
import { useState } from "react";
import { login } from "../api/user.js";
import toast, { Toaster } from "react-hot-toast";
import {useAuthContext} from '../context/authContext.jsx'
import Welcome from "../components/Welcome.jsx";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [seePass, setSeePass] = useState(false);
  const [welcome,setWelcome] = useState(false);

  const navigate = useNavigate();
  const {setUser} = useAuthContext();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(form.email === "" || form.password === "")
        return toast.error(`Por favor, complete todos los campos para iniciar sesión.`);
      const res = await login(form);
      toast.success(
        `Credenciales correctas. Redireccionando a la página principal.`
      );
      setUser(res.data);
      setWelcome(true);
      setTimeout(() => {
        setWelcome(false);
        if (res.data.Rol === "client") navigate("/");
        else navigate("/dashboard");
      }, 3000);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
      //console.log(err)
    }
  };

  return (
    <section className="flex items-center justify-center h-screen w-screen bg-pink-100">
      {welcome === true ? <Welcome /> :
      <div className="flex items-center justify-center h-auto w-auto shadow-2xl scale-up-center rounded-md bg-white">
        <div className="flex flex-col items-center p-2">
          <img src={LoginIMG} alt="login" className=" w-96" />
          <p className="text-center text-sm block w-64 p-2 text-slate-800">
            Descubre una gran variedad de productos al mejor precio del mercado.
            ¿Qué esperas para iniciar sesión?
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center p-2"
        >
          <img src={GW} alt="logo-gw" className=" w-20" />
          <h2 className="uppercase text-red-500 text-xl font-bold">
            Iniciar sesión
          </h2>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-envelope p-1"></i>
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse text-sm border-gray-400 p-1 w-52 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="p-2 font-bold text-sm text-red-400 uppercase"
            >
              <i className="fas fa-unlock-alt p-1"></i>
              Contraseña
            </label>
            <input
              type={`${seePass === true ? 'text' : 'password'}`}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              style={{
                transition: "all .1s ease-in",
              }}
              className="border-collapse border-gray-400 text-sm p-1 w-52 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              placeholder="Contraseña"
            />
            <div className="flex justify-center p-1 gap-2 mt-2">
              <input type="checkbox" name="seePass" checked={seePass} onChange={()=> seePass === false ? setSeePass(true): setSeePass(false)} id="seePass" className=" hidden"/>
              <label htmlFor="seePass" className="cursor-pointer text-sm text-slate-700">
              <i className={`p-1 fas ${seePass === true ?'fa-eye': 'fa-eye-slash'}`}></i>
                Ver contraseña</label>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-1">
            <button className="uppercase font-bold text-center text-sm text-white bg-blue-600 h-8 p-1 w-20 rounded transition-all hover:bg-blue-400">
              Login
            </button>
            <Link to="/register" className="text-sm w-36 block text-center">
              ¿Aún no tienes una cuenta?{" "}
              <span className="font-bold text-red-400">Registrate Aquí</span>
            </Link>
          </div>
        </form>
      </div>
            }
      <Toaster position="top-center" />
    </section>
  );
}
