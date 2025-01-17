import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Toaster, toast } from "react-hot-toast";
import TableComments from "./TableComments";
import {
  deleteComment,
  getComments,
  getCommentsForIdProduct,
} from "../../api/comments";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";
import MyAlert from "../../components/MyAlert";

export default function CommentsPage() {
  const [form, setForm] = useState({ filter: "" });
  const [data, setData] = useState([]);
  const [myAlert, setMyAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const openAlert = (id) => {
    setMyAlert(true);
    setIdToDelete(id);
  };

  const closeAlert = () => {
    setMyAlert(false);
    setIdToDelete(null);
  };

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
      const res = await getComments();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getFilter = async (id_producto) => {
    try {
      const res = await getCommentsForIdProduct(id_producto, 100, 0);
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

  const deleteData = async () => {
    try {
      await deleteComment(idToDelete, user.Token);
      toast.success(
        `El comentario con Id ${idToDelete} fue eliminado correctamente`
      );
      getData();
      setForm({ filter: "" });
      closeAlert();
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
            <h2 className="p-2 uppercase text-red-500 font-bold text-xl text-center">
              Control De Comentario
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
        </div>
        <TableComments
          tableHead={[
            "Id",
            "Comentario",
            "Fecha",
            "Id_Producto",
            "Id_Usuario",
            "Acciones",
          ]}
          data={data}
          deleteData={openAlert}
        />
      </section>
      <Toaster position="top-center" />
      {myAlert && (
        <MyAlert
          title={"Eliminar Comentario"}
          text={"Estás apunto de eliminar este comentario. ¿Deseas continuar?"}
          onClose={closeAlert}
          onAction={deleteData}
        />
      )}
    </section>
  );
}
