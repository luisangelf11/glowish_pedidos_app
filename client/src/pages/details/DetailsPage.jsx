import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { useParams, Link } from "react-router-dom";
import TableContent from "./TableContent";
import { toast, Toaster } from "react-hot-toast";
import { getDetails } from "../../api/details";

export default function DetailsPage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await getDetails(id);
      let suma  =0;
      res.data.forEach(el=>{
          suma += el.SubTotal;
        });
        setTotal(suma);
        setData(res.data);
    } catch (err) {
      toast.success(err.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex h-screen">
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 ml-auto gap-2 flex flex-col items-center"
      >
        <h2 className="p-2 uppercase text-red-500 font-bold text-xl text-center">
          Detalle del pedido #{id}
        </h2>
        <TableContent
          tableHead={[
            "Id_Producto",
            "Unidades",
            "Descuento",
            "Size",
            "Color",
            "SubTotal",
          ]}
          data={data}
        />
        <div className="flex justify-start gap-8 " style={{ width: "90%" }}>
          <div className="bg-white rounded-md p-2 shadow-md flex gap-2">
            <i className="fas fa-cash-register text-red-400 text-5xl p-1"></i>
            <div>
              <h3 className="text-red-400 uppercase font-bold">
                Total del pedido:
              </h3>
              <span className="font-semibold text-gray-600">{parseFloat(total + 300).toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-white rounded-md p-2 shadow-md flex gap-2">
            <div>
              <h3 className="text-red-400 uppercase font-bold">
                Nota:
              </h3>
              <span className="font-semibold text-gray-600 text-sm">Recuerde que el pago por envío es de $RD 300.00</span>
            </div>
          </div>
          <Link
            to="/pedidos"
            className="bg-red-600 p-2 h-10 mt-4 cursor-pointer text-white rounded-sm transition-all hover:bg-red-500"
          >
            <i className="fas fa-hand-point-left p-1"></i>Regresar
          </Link>
        </div>
      </section>
      <Toaster position="top-center" />
    </section>
  );
}
