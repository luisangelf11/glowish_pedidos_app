import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { toast, Toaster } from "react-hot-toast";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createColor, getColor, updateColor } from "../../api/colors";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";

export default function FormColors({ edit }) {
  const initialValues = {
    color: "",
    rgb: "",
    estado: "",
    id_producto: "",
  };
  const [form, setForm] = useState(initialValues);

  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { invalidToken } = useToken();

  const getDataEdit = async () => {
    try {
      const res = await getColor(parseInt(id));
      setForm({
        color: res.data.Color,
        rgb: res.data.Rgb,
        estado: res.data.Estado,
        id_producto: res.data.Id_Producto,
      });
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };

  useEffect(() => {
    if (edit === true) getDataEdit();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateData = () => {
    if (
      form.color === "" ||
      form.rgb === "" ||
      form.estado === "" ||
      form.id_producto === ""
    )
      return false;
    else return true;
  };

  const addColor = async () => {
    try {
      if (!validateData())
        return toast.error(`Por favor, complete todos los campos`);
      const dataValues = {
        color: form.color,
        rgb: form.rgb,
        id_producto: parseInt(form.id_producto),
        estado: form.estado,
      };
      const res = await createColor(dataValues, user.Token);
      toast.success(`¡El color se fue creado correctamente!`);
      setForm(initialValues);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(`${err.response.data.message}`);
    }
  };

  const editColor = async () => {
    try {
      const data = {
        color: form.color,
        rgb: form.rgb,
        id_producto: parseInt(form.id_producto),
        estado: form.estado,
      };
      const res = await updateColor(id, data, user.Token);
      setForm(initialValues);
      toast.success(
        `¡El color fue modificado correctamente! Redireccionando a la tabla de colores.`
      );
      setTimeout(() => {
        navigate("/colores");
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
    if (edit === false) addColor();
    else editColor();
  };

  return (
    <section className="flex h-screen">
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 ml-auto gap-2 flex flex-col items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="scale-up-center bg-white w-2/3 shadow rounded-md flex flex-col gap-2 items-center p-2"
        >
          <h2 className="text-xl font-semibold p-2 text-red-500 uppercase">
            {edit === false ? "Crear color" : `Editar color #${id}`}
          </h2>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="color" className="text-sm font-bold text-red-400">
                Nombre:
              </label>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="Color"
                value={form.color}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rgb" className="text-sm font-bold text-red-400">
                Rgb:
              </label>
              <input
                type="color"
                name="rgb"
                id="rgb"
                value={form.rgb}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="id_producto"
                className="text-sm font-bold text-red-400"
              >
                Id_producto:
              </label>
              <input
                type="text"
                name="id_producto"
                id="id_producto"
                placeholder="Id_Producto"
                value={form.id_producto}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="estado"
                className="text-sm font-bold text-red-400"
              >
                Estado:
              </label>
              <select
                name="estado"
                id="estado"
                value={form.estado}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              >
                <option value="">--SELECCIONE--</option>
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500">
              <i className="fas fa-save p-1"></i>Guardar
            </button>
            <Link
              to="/colores"
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
