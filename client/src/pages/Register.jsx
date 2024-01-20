import React, { useState, useEffect } from "react";
import RegisterIMG from "../assets/register.avif";
import GW from "../assets/GW.png";
import "../assets/css/animation.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { register } from "../api/user.js";

export default function Register() {
  const initialForm ={
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    ciudad: "",
    municipio: "",
    telefono: "",
  };
  //States
  const [form, setForm] = useState(initialForm);
  const [citys, setCitys] = useState([]);
  const [municipalitys, setMunicipalitys] = useState([]);

  const navigate = useNavigate();

  //Get all citys
  const getCitys = async () => {
    try {
      const res = await axios.get(
        `https://api.digital.gob.do/v1/territories/provinces`
      );
      setCitys(res.data.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Get the municipalys with the code city
  const getMunicipalys = async (id) => {
    try {
      const res = await axios.get(
        `https://api.digital.gob.do/v1/territories/municipalities?provinceCode=${id}`
      );
      setMunicipalitys(res.data.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Validate the inputs
  const validateInputs = ()=>{
    if(form.apellido === '' || form.ciudad === ''|| form.contrasena === '' || form.correo === ''
     || form.municipio === '' || form.nombre === '' || form.telefono === '') return false;
     else return true;
  }

  //cicle life components
  useEffect(() => {
    getCitys();
    if (form.ciudad !== "") getMunicipalys(form.ciudad);
    else setMunicipalitys([]);
  }, [form.ciudad]);

  //EVENTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(validateInputs()){
        const city = citys[parseInt(form.ciudad) - 1];
        const municipality = municipalitys[parseInt(form.municipio) - 1];
        const res = await register({
          correo: form.correo,
          contrasena: form.contrasena,
          nombre: form.nombre,
          apellido: form.apellido,
          avatar: "",
          direccion: `${city.name}, ${municipality.name}`,
          telefono: form.telefono,
          rol: "client",
        });
        console.log(res)
        setForm(initialForm);
        toast.success("Su cuenta fue creada de forma exitosa. Redirigiendo al inicio de sesión.");
        setTimeout(()=>{
          navigate('/login');
        }, 3000);
      }else toast.error(`Debes de completar todos los campos para poder crear tu cuenta de chica Glowish.`);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen w-screen bg-pink-100">
      <div className="flex items-center justify-center h-auto w-auto p-4 shadow-2xl rounded-md scale-up-center bg-white">
        <div className="flex flex-col items-center p-2">
          <img src={RegisterIMG} alt="register" className="w-96" />
          <p className="text-center text-sm block w-64 p-2 text-slate-800">
            Crea tu cuenta ahora mismo y se parte de la familia Glowish.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center p-2"
        >
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
                htmlFor="ciudad"
                className="p-2 font-bold text-sm text-red-400 uppercase"
              >
                <i className="fas fa-map-marked-alt p-1"></i>
                Provincia:
              </label>
              <select
                name="ciudad"
                id="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                style={{
                  transition: "all .1s ease-in",
                }}
                className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              >
                <option value="">-- SELECCIONA UNA PROVINCIA</option>
                {citys.map((el) => (
                  <option key={el.code} value={el.code}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex ">
            <div className="flex flex-col">
              <label
                htmlFor="municipio"
                className="p-2 font-bold text-sm text-red-400 uppercase"
              >
                <i className="fas fa-map-marked-alt p-1"></i>
                Municipio:
              </label>
              <select
                name="municipio"
                id="municipio"
                value={form.municipio}
                onChange={handleChange}
                style={{
                  transition: "all .1s ease-in",
                }}
                className="border-collapse text-sm border-gray-400 p-1 w-48 rounded-sm border outline-none focus:border-blue-500 focus:border-2"
              >
                <option value="">-- SELECCIONA UN MUNICIPIO</option>
                {municipalitys.map((el) => (
                  <option key={el.code} value={el.code}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              to="/login"
              className="text-md w-48 p-1 block text-center mt-4 ml-4"
            >
              ¿Ya tienes una cuenta?{" "}
              <span className="font-bold text-red-400">
                Inicia Sesión Ahora.
              </span>
            </Link>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button className="uppercase font-bold text-center text-sm text-white bg-blue-600 h-8 p-2 w-28 rounded transition-all hover:bg-blue-400">
              Registrar
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </section>
  );
}
