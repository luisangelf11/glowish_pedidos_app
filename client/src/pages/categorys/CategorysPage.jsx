import React, { useState, useEffect } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Link } from "react-router-dom";
import TableContent from "./TableContent";
import { useAuthContext } from "../../context/authContext";
import {
  deleteCategory,
  filterCategorys,
  getCategorysLimit,
} from "../../api/category";
import { toast, Toaster } from "react-hot-toast";
import { useToken } from "../../hooks/useToken";

export default function CategorysPage() {
  const [form, setForm] = useState({
    filter: "",
  });
  const [data, setData] = useState([]);
  const { user } = useAuthContext();
  const { invalidToken } = useToken();

  const getData = async () => {
    try {
      const res = await getCategorysLimit(10, 0);
      setData(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
      setData([]);
    }
  };

  const filterData = async (name) => {
    try {
      const res = await filterCategorys(name);
      setData(res.data);
    } catch (err) {
      setData([]);
      console.log(err);
    }
  };

  useEffect(() => {
    if (form.filter === "") getData();
    else filterData(form.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.filter]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const deleteData = async (id) => {
    try {
      const response = confirm(`¿Deseas eliminar esta categoría?`);
      if (response) {
        await deleteCategory(id, user.Token);
        toast.success(`La categoría con Id ${id} fue eliminada correctamente`);
        getData();
        setForm({ filter: "" });
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(err.response.data.message);
    }
  };

  return (
    <section className="flex h-screen">
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 ml-auto gap-2 flex flex-col items-center"
      >
        <div
          className="flex justify-around p-2 scale-up-center"
          style={{ width: "100%" }}
        >
          <div className="flex flex-col w-2/3">
            <h2 className="text-left p-2 uppercase text-red-500 font-bold text-xl">
              Control de categorías
            </h2>
            <form
              className="bg-white border rounded-xl"
              style={{ width: "90%" }}
            >
              <i className="fas fa-search p-2 text-red-400"></i>
              <input
                type="text"
                name="filter"
                placeholder="Buscar..."
                className="outline-none text-sm w-11/12"
                value={form.filter}
                onChange={handleChange}
              />
            </form>
          </div>
          <Link
            to="/nueva-categoria"
            className="bg-green-700 flex justify-center items-center p-1 w-44 h-10 mt-10 rounded-sm text-white font-semibold transition-all hover:bg-green-600"
          >
            <i className="fas fa-plus p-1"></i>
            Nueva Categoría
          </Link>
        </div>
        <TableContent
          data={data}
          tableHead={["Id", "Nombre", "Descripción", "Acciones"]}
          deleteData={deleteData}
        />
        <Toaster position="top-center" />
      </section>
    </section>
  );
}
