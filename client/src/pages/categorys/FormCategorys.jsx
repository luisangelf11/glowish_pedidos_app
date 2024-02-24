/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import MenuAdmin from "../../components/MenuAdmin";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../api/category";
import { useToken } from "../../hooks/useToken";

export default function FormCategorys({ edit }) {
  const initialForm = {
    nombre: "",
    descripcion: "",
  };

  const [form, setForm] = useState(initialForm);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { invalidToken } = useToken();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getDataEdit = async (id) => {
    try {
      const res = await getCategory(parseInt(id));
      console.log(res.data);
      setForm({
        nombre: res.data.Nombre,
        descripcion: res.data.Descripcion,
      });
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };

  useEffect(() => {
    if (edit === true) getDataEdit(id);
  }, []);

  const validateData = () => {
    if (form.nombre === "" || form.descripcion === "") return false;
    else return true;
  };

  const addCategory = async () => {
    try {
      if (!validateData())
        return toast.error(`Por favor, complete todos los campos`);
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
      };
      const res = await createCategory(data, user.Token);
      console.log(res.data);
      setForm(initialForm);
      toast.success(`¡El producto se fue creado correctamente!`);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(`${err.response.data.message}`);
    }
  };

  const editCategory = async () => {
    try {
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
      };
      const res = await updateCategory(id, data, user.Token);
      console.log(res.data);
      setForm(initialForm);
      toast.success(
        `¡La categoría fue modificada correctamente! Redireccionando a la tabla de categorías.`
      );
      setTimeout(() => {
        navigate("/categorias");
      }, 3000);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(`${err.response.data.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === false) addCategory();
    else editCategory();
  };

  return (
    <section className="flex h-screen">
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 gap-2 ml-auto flex flex-col justify-center items-center"
      >
        <form
          onSubmit={handleSubmit}
          className="scale-up-center bg-white w-2/3 shadow rounded-md flex flex-col gap-2 items-center p-2"
        >
          <h2 className="text-xl font-semibold p-2 text-red-500 uppercase">
            {edit === false ? "Crear categoría" : `Editar categoría #${id}`}
          </h2>
          <div className="flex flex-col justify-center gap-4">
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
                htmlFor="descripcion"
                className="text-sm font-bold text-red-400"
              >
                Descripción:
              </label>
              <textarea
                type="text"
                name="descripcion"
                id="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                maxLength={200}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500">
              <i className="fas fa-save p-1"></i>Guardar
            </button>
            <Link
              to="/categorias"
              className="bg-red-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-500"
            >
              <i className="fas fa-hand-point-left p-1"></i>Regresar
            </Link>
          </div>
        </form>
        <Toaster position="top-center" />
      </section>
    </section>
  );
}
