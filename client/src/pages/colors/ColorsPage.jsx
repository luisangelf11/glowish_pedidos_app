import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Link } from "react-router-dom";
import TableContent from "./TableContent";
import { Toaster, toast } from "react-hot-toast";
import { deleteColor, filterColors, getColors } from "../../api/colors";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";
import MyAlert from "../../components/MyAlert";

export default function ColorsPage() {
  const [form, setForm] = useState({
    filter: "",
  });
  const [data, setData] = useState([]);
  const [myAlert, setMyAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const { user } = useAuthContext();
  const { invalidToken } = useToken();

  const openAlert = (id) => {
    setMyAlert(true);
    setIdToDelete(id);
  };

  const closeAlert = () => {
    setMyAlert(false);
    setIdToDelete(null);
  };

  const getData = async () => {
    try {
      const res = await getColors(10, 0);
      setData(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
      setData([]);
    }
  };

  const filterData = async (Id_Producto) => {
    try {
      const res = await filterColors(Id_Producto);
      setData(res.data);
    } catch (err) {
      setData([]);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (form.filter === "") getData();
    else filterData(form.filter);
  }, [form.filter]);

  const deleteData = async () => {
    try {
      await deleteColor(idToDelete, user.Token);
      toast.success(
        `El color con Id ${idToDelete} fue eliminado correctamente`
      );
      getData();
      setForm({ filter: "" });
      closeAlert();
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
              Control de colores
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
            to="/nuevo-color"
            className="bg-green-700 flex justify-center items-center p-1 w-44 h-10 mt-10 rounded-sm text-white font-semibold transition-all hover:bg-green-600"
          >
            <i className="fas fa-plus p-1"></i>
            Nuevo Color
          </Link>
        </div>
        <TableContent
          tableHead={[
            "Id",
            "Color",
            "Rgb",
            "Estado",
            "Id_Producto",
            "Acciones",
          ]}
          data={data}
          deleteData={openAlert}
        />
      </section>
      <Toaster position="top-center" />
      {myAlert && (
        <MyAlert
          title={"Eliminar Color"}
          text={"Estás apunto de eliminar este color. ¿Deseas continuar?"}
          onClose={closeAlert}
          onAction={deleteData}
        />
      )}
    </section>
  );
}
