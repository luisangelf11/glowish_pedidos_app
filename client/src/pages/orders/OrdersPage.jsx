import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Toaster, toast } from "react-hot-toast";
import TableContent from "./TableContent";
import { getFilterOrders, getOrders, updateOrder } from "../../api/orders";
import { useAuthContext } from "../../context/authContext";

export default function OrdersPage() {
  const [form, setForm] = useState({ filter: "" });
  const [data, setData] = useState([]);

  const {user} = useAuthContext()

  const getData = async () => {
    try {
      const res = await getOrders(100, 0);
      setData(res.data);
    } catch (err) {
      toast.success(err.response.data.message);
    }
  };

  const getFilter = async (id) => {
    try {
      const res = await getFilterOrders(id);
      setData(res.data);
    } catch (err) {
      toast.success(err.response.data.message);
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
    else getFilter(form.filter);
  }, [form.filter]);

  const generateState =(estado)=>{
    if(estado === 'Solicitado') return 'Enviado'
    else if (estado === 'Enviado') return 'Entregado';
  }

  const editOrder = async(id, estado)=>{
    try{
        const dataEnpoint = {
            estado: generateState(estado)
        }
        await updateOrder(id, dataEnpoint, user.Token);
        toast.success(`¡El estado del pedido ${id} fue modificado!`);
        getData();
    }
    catch(err){
      toast.success(err.response.data.message);
    }
  }

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
              Control De Pedidos
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
        <TableContent
          tableHead={[
            "Id",
            "Fecha",
            "Estado",
            "Monto",
            "Id_Usuario",
            "Cambio de Estado",
            "Detalle"
          ]}
          data={data}
          editOrder={editOrder}
        />
      </section>
      <Toaster position="top-center" />
    </section>
  );
}
