import React, { useEffect, useState } from "react";
import MenuUser from "../components/MenuUser";
import { useAuthContext } from "../context/authContext";
import iconUser from "../assets/userIcon.jpg";
import axios from "axios";
import { changePassword, updateUser } from "../api/user";
import { toast, Toaster } from "react-hot-toast";
import NewPassword from "../components/NewPassword";
import "../assets/css/animation.css";
import { useToken } from "../hooks/useToken";
import Modal from "../components/Modal";

export default function Profile() {
  const { user, setUser } = useAuthContext();
  const intialValues = {
    nombre: user.Nombre,
    apellido: user.Apellido,
    telefono: user.Telefono,
    provincia: "",
    municipio: "",
  };
  const [form, setForm] = useState(intialValues);
  const [citys, setCitys] = useState([]);
  const [municipalitys, setMunicipalitys] = useState([]);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(user.Avatar);
  const [modal, setModal] = useState(false);

  const { invalidToken } = useToken();

  //Get all citys
  const getCitys = async () => {
    try {
      const res = await axios.get(
        `https://api.digital.gob.do/v1/territories/provinces`
      );
      setCitys(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Get the municipalys with the code city
  const getMunicipalys = async (id) => {
    try {
      const res = await axios.get(
        `https://api.digital.gob.do/v1/territories/municipalities?provinceCode=${id}`
      );
      setMunicipalitys(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getCitys();
    if (form.provincia !== "") getMunicipalys(form.provincia);
    else setMunicipalitys([]);
  }, [form.provincia]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const city = citys[parseInt(form.provincia) - 1];
      const municipality = municipalitys[parseInt(form.municipio) - 1];
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        direccion:
          form.provincia !== "" && form.municipio !== ""
            ? `${city.name}, ${municipality.name}`
            : user.Direccion,
      };
      await updateUser(user.Id, data, user.Token);
      setUser({
        ...user,
        Nombre: data.nombre,
        Apellido: data.apellido,
        Telefono: data.telefono,
        Direccion: data.direccion,
      });

      toast.success(`¡Tus datos fuerón actualizados!`);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(`${err.response.message}`);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgUrl(url);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3000/api/v1/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setImgUrl(result.urlImage);
        toast.success(`La imagen está guardada`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const updatePass = async (data) => {
    try {
      await changePassword(user.Id, data, user.Token);
      toast.success(`¡Tu contraseña fue actualizada correctamente!`);
    } catch (err) {
      toast.error(`${err.response.message}`);
    }
  };

  const passwordsNotSame = () => {
    toast.error(`¡Los campos están vacíos o no coinciden!`);
  };

  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const changeAvatar = async()=>{
    try{
      const data ={
        avatar: imgUrl
      }
      await updateUser(user.Id, data, user.Token);
      setUser({
        ...user,
        Avatar: data.avatar
      });

      toast.success(`¡Tu foto de perfil fue actualizada!`);
    }
    catch(err){
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(`${err.response.message}`);
    }
  }

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      <section className="w-full gap-2 flex flex-col items-center mt-16 scale-up-center">
        <h2
          className="text-xl font-bold uppercase text-red-400 p-2 text-center"
          style={{
            letterSpacing: "10px",
          }}
        >
          Perfil de usuario
        </h2>
        <article className="flex justify-center gap-20 w-full mt-2">
          <div className="flex flex-col gap-2 items-center border-r p-8">
            <h3 className="text-center p-2 text-red-400 uppercase font-semibold">
              Datos del usuario
            </h3>
            <img
              src={user.Avatar}
              alt="profile"
              className=" w-36 h-36 rounded-full object-cover"
            />
            <p className="p-2 text-gray-500 font-semibold uppercase border-b">
              {user.Nombre} {user.Apellido}
            </p>
            <p className="text-sm text-slate-800">
              <i className="fas fa-envelope p-1"></i>
              {user.Correo}
            </p>
            <p className="text-sm text-slate-800">
              <i className="fas fa-map-marked-alt p-1"></i>
              {user.Direccion}
            </p>
            <p className="text-sm text-slate-800">
              <i className="fas fa-phone p-1"></i>
              {user.Telefono}
            </p>
            <button
              className="bg-blue-800 p-2 mt-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-700"
              onClick={openModal}
            >
              Cambiar Foto
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center p-4"
          >
            <h3 className="text-center p-2 text-red-400 uppercase font-semibold">
              Actualizar datos
            </h3>
            <div className="flex flex-col">
              <label
                htmlFor="nombre"
                className="text-sm font-bold text-red-400"
              >
                Nombre:
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="apellido"
                className="text-sm font-bold text-red-400"
              >
                Apellido:
              </label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="telefono"
                className="text-sm font-bold text-red-400"
              >
                Teléfono:
              </label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                placeholder="000-000-0000"
                value={form.telefono}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="provincia"
                className="text-sm font-bold text-red-400"
              >
                Provincia:
              </label>
              <select
                name="provincia"
                id="provincia"
                value={form.provincia}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              >
                <option value="">--SELECCIONE--</option>
                {citys.map((el) => (
                  <option key={el.code} value={el.code}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="municipio"
                className="text-sm font-bold text-red-400"
              >
                Municipio:
              </label>
              <select
                name="municipio"
                id="municipio"
                value={form.municipio}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              >
                <option value="">--SELECCIONE--</option>
                {municipalitys.map((el) => (
                  <option key={el.code} value={el.code}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500">
              <i className="fas fa-save p-1"></i>Guardar
            </button>
          </form>
          <NewPassword
            updatePass={updatePass}
            passwordsNotSame={passwordsNotSame}
          />
        </article>
      </section>
      {modal && (
        <Modal title={"Cambiar foto de perfil"} onClose={closeModal}>
          <div className="flex flex-col gap-2 items-center">
          <img
              src={imgUrl || iconUser}
              alt="profile"
              className=" w-28 h-28 rounded-full object-cover"
            />
            <form
              onSubmit={uploadFile}
              className="flex flex-col items-center border-b p-2"
            >
              <div className="flex flex-col gap-2 items-center">
                <label
                  htmlFor="file"
                  className="text-sm font-bold text-red-400"
                >
                  Seleccione la imagen:
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                />
              </div>
              <button className="bg-green-600 p-2 mt-2 cursor-pointer text-white rounded-sm transition-all hover:bg-green-500">
                <i className="p-1 fas fa-upload"></i>Subir archivo
              </button>
            </form>
            <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500" onClick={changeAvatar}>
              <i className="fas fa-save p-1"></i>Guardar cambios
            </button>
          </div>
        </Modal>
      )}
      <Toaster position="top-center" />
    </section>
  );
}
