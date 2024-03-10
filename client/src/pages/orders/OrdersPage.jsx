import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { Toaster, toast } from "react-hot-toast";
import TableContent from "./TableContent";
import { getFilterOrders, getOrders, updateOrder } from "../../api/orders";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportOrders from "../../reports/ReportOrders";

export default function OrdersPage() {
  const [form, setForm] = useState({ filter: "" });
  const [formReport, setFormReport] = useState({ from: "", to: "" });
  const [data, setData] = useState([]);
  const [createReport, setCreateReport] = useState(false);

  const { user } = useAuthContext();
  const { invalidToken } = useToken();

  const getData = async () => {
    try {
      const res = await getOrders(10, 0);
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

  const handleChangeReport = (e) => {
    setFormReport({
      ...formReport,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (form.filter === "") getData();
    else getFilter(form.filter);
  }, [form.filter]);

  const generateState = (estado) => {
    if (estado === "Solicitado") return "Enviado";
    else if (estado === "Enviado") return "Entregado";
  };

  const editOrder = async (id, estado) => {
    try {
      const dataEnpoint = {
        estado: generateState(estado),
      };
      await updateOrder(id, dataEnpoint, user.Token);
      toast.success(`¡El estado del pedido ${id} fue modificado!`);
      getData();
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else toast.success(err.response.data.message);
    }
  };

  const report =()=> setCreateReport(true);

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
            "Id_Cliente",
            "Cliente",
            "Destino",
            "Cambio de Estado",
            "Detalle",
          ]}
          data={data}
          editOrder={editOrder}
        />
        <article className="flex justify-center gap-4 w-auto mt-4 p-4">
          <div className="flex gap-2">
            <label htmlFor="from" className="font-semibold text-gray-700 p-1">
              Desde:
            </label>
            <input
              type="date"
              name="from"
              className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2 h-8"
              value={formReport.from}
              onChange={handleChangeReport}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="to" className="font-semibold text-gray-700 p-1">
              Hasta:
            </label>
            <input
              type="date"
              name="to"
              className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2 h-8"
              value={formReport.to}
              onChange={handleChangeReport}
            />
          </div>
          <button className="bg-blue-700 flex justify-center items-center p-1 h-auto rounded-sm text-white font-semibold transition-all hover:bg-blue-600 text-sm" onClick={report}>
            Crear reporte
          </button>
          {createReport && <PDFDownloadLink
            document={
              <ReportOrders from={formReport.from} to={formReport.to} />
            }
            fileName="Reporte_Pedidos.pdf"
          >
            {({ loading, url, error, blob }) =>
              loading ? (
                <button className="bg-blue-700 flex justify-center items-center p-1 h-10 rounded-sm text-white font-semibold transition-all hover:bg-blue-600">
                  <i className="fas fa-spinner p-2"></i>
                </button>
              ) : (
                <button className="bg-blue-700 flex justify-center items-center p-1 h-10  rounded-sm text-white font-semibold transition-all hover:bg-blue-600" onClick={()=> setTimeout(()=>{
                  setCreateReport(false);
                }, 3000)}>
                  <i className="fas fa-file p-2"></i>
                </button>
              )
            }
          </PDFDownloadLink>}
        </article>
      </section>
      <Toaster position="top-center" />
    </section>
  );
}
