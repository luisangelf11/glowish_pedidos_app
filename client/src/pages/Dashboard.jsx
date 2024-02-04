import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MenuAdmin from "../components/MenuAdmin";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { orderStatus, productColumn, topFiveDays, topUsers } from "../api/dashboard";
import CardUser from "../components/CardUser";
import '../assets/css/animation.css'

export default function Dashboard() {
  const [orders, setOrders] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState({});

  const getData = async () => {
    try {
      const resOrder = await orderStatus();
      setOrders(resOrder.data);
      const resChart = await topFiveDays();
      setData(resChart.data);
      const resUser = await topUsers();
      setUsers(resUser.data);
      const resProduct = await productColumn();
      setProducts(resProduct.data);
    } catch (err) {
      toast.error(err.response.data.message);
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
        className="bg-gray-100 flex ml-auto flex-col items-center scale-up-center"
      >
        <h2 className="text-left p-4 uppercase text-red-500 font-bold text-xl">
          Dashboard
        </h2>
        <article className="flex mt-5 gap-3">
          <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
            <i className="fas fa-truck text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Pedidos Enviados
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {orders.total_pedidos_enviados}
              </p>
            </div>
          </div>
          <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
            <i className="fas fa-boxes text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Pedidos Entregados
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {orders.total_pedidos_entregados}
              </p>
            </div>
          </div>
          <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
            <i className="fas fa-box-tissue text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Total De Pedidos
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {orders.total_pedidos}
              </p>
            </div>
          </div>
        </article>
        <article className="flex mt-5 gap-3">
          <div className="bg-white shadow-2xl rounded-md flex flex-col items-center p-4">
            <h3 className="text-md uppercase text-gray-600 font-semibold">Fechas con más ventas</h3>
            <BarChart
              width={450}
              height={200}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              className="text-sm"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_pedidos" fill="#F87171" />
            </BarChart>
          </div>
          <div className="bg-white shadow-2xl rounded-md flex flex-col items-center p-4">
          <h3 className="text-md uppercase text-gray-600 font-semibold">Usuarios Destacados</h3>
          {users.map((el,index)=> <CardUser key={index} data={el} />)}
          </div>
        </article>
        <article  className="flex mt-5 gap-3">
        <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
            <i className="fas fa-list-ol text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Unidades Totales
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {products.Total_Unidades}
              </p>
            </div>
          </div>
          <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
          <i className="fas fa-money-check-alt text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Total En Inventario
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {parseFloat(products.Total_Inventario).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="shadow-2xl rounded-md bg-white flex gap-2 p-4">
          <i className="fas fa-money-check-alt text-5xl text-red-400"></i>
            <div>
              <h3 className="text-md uppercase text-gray-600 font-semibold">
                Total De Clientes
              </h3>
              <p className="text-sm font-semibold text-gray-400">
                {orders.total_clientes}
              </p>
            </div>
          </div>
        </article>
        <Toaster position="top-center" />
      </section>
    </section>
  );
}
