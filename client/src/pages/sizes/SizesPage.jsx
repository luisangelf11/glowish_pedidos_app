import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import TableContent from "./TableContent";
import { deleteSize, getFilterSizes, getSizes } from "../../api/sizes";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";

export default function SizesPage() {
  const [form, setForm] = useState({ filter: "" });
  const [data, setData] = useState([]);
  const { user } = useAuthContext();
  const { invalidToken } = useToken();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const getData = async () => {
    try {
      const res = await getSizes(10, 0);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getFilter = async (id_producto) => {
    try {
      const res = await getFilterSizes(id_producto);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (form.filter === "") getData();
    else getFilter(form.filter);
  }, [form.filter]);

  const deleteData = async (id) => {
    try {
      let answer = confirm("¿Deseas eliminar este size?");
      if (answer === true) {
        await deleteSize(id, user.Token);
        toast.success(`El size con Id ${id} fue eliminado correctamente`);
        getData();
        setForm({ filter: "" });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.error(error.response.data.message);
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
              Control de sizes
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
            to="/nuevo-sizes"
            className="bg-green-700 flex justify-center items-center p-1 w-44 h-10 mt-10 rounded-sm text-white font-semibold transition-all hover:bg-green-600"
          >
            <i className="fas fa-plus p-1"></i>
            Nuevo Sizes
          </Link>
        </div>
        <TableContent
          tableHead={["Id", "Size", "Estado", "Id_Producto", "Acciones"]}
          data={data}
          deleteData={deleteData}
        />
      </section>
      <Toaster position="top-center" />
    </section>
  );
}
