import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin";
import { useParams, Link } from "react-router-dom";
import TableContent from "./TableContent";
import { toast, Toaster } from "react-hot-toast";
import { getDetails } from "../../api/details";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportDetail from "../../reports/ReportDetail";

export default function DetailsPage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await getDetails(id);
      let suma = 0;
      res.data.forEach((el) => {
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
        <div className="flex justify-start gap-4 " style={{ width: "90%" }}>
          <div className="bg-white rounded-md p-2 h-16 shadow-md flex gap-2">
            <i className="fas fa-cash-register text-red-400 text-4xl p-1"></i>
            <div>
              <h3 className="text-red-400 uppercase font-bold">
                Total del pedido:
              </h3>
              <span className="font-semibold text-gray-600">
                {parseFloat(total).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="bg-white w-60 rounded-md p-2 shadow-md flex gap-2">
            <div>
              <h3 className="text-red-400 uppercase font-bold">Nota:</h3>
              <span className="font-semibold text-gray-600 text-sm">
                Recuerde sumar el pago por envío que es de $RD 300.00 y si el
                cliente es de La Vega es de RD$ 100.00
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/pedidos"
              className="bg-red-600 p-2 h-10 mt-4 cursor-pointer text-white rounded-sm transition-all hover:bg-red-500"
            >
              <i className="fas fa-hand-point-left p-1"></i>Regresar
            </Link>
            <PDFDownloadLink
              document={<ReportDetail id={id} />}
              fileName="ReporteDetalle.pdf"
            >
              {({ loading, url, error, blob }) =>
                loading ? (
                  <button className="bg-blue-700 flex justify-center items-center p-1 h-10 mt-4 rounded-sm text-white font-semibold transition-all hover:bg-blue-600">
                    <i className="fas fa-spinner p-2"></i>
                  </button>
                ) : (
                  <button className="bg-blue-700 flex justify-center items-center p-1 h-10 mt-4 rounded-sm text-white font-semibold transition-all hover:bg-blue-600">
                    <i className="fas fa-file p-2"></i>
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </section>
      <Toaster position="top-center" />
    </section>
  );
}
