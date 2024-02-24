import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ItemOrder from "./ItemOrder";
import { deleteCart, getCarts } from "../../api/cart";
import { useAuthContext } from "../../context/authContext";
import { toast, Toaster } from "react-hot-toast";
import ErrorData from "../../components/ErrorData";
import { useNavigate } from "react-router-dom";
import NoneData from "../../components/NoneData";
import Loader from "../../components/Loader";
import { useOrderContext } from "../../context/orderContext";
import { useToken } from "../../hooks/useToken";

export default function CartPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const { order } = useOrderContext();
  const { invalidToken } = useToken();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getCarts(user.Id, user.Token);
      setTimeout(() => {
        if (!res.data.length) setEmpty(true);
        else setEmpty(false);
        setLoading(false);
        setData(res.data);
      }, 3000);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const goToOrder = () => {
    if (order.length === 0)
      toast.error(`¡Necesitas agregar productos al pedido!`);
    else {
      toast.success(`Redirigiendo al generador de pedidos...`);
      setTimeout(() => {
        navigate("/crear-pedido");
      }, 3000);
    }
  };

  const deleteProductCart = async (id) => {
    try {
      let answer = confirm(
        `¿Deseas eliminar este producto del carrito de compras?`
      );
      if (answer) {
        await deleteCart(id, user.Token);
        toast.success(`¡Producto eliminado del carrito!`);
        setData([]);
        getData();
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const alertShow = () => {
    toast.error(
      `Este producto no cuenta con las unidades suficientes para ser vendido. Por favor, verifique cuantas unidades disponibles tiene este producto`
    );
  };

  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <section className="w-full gap-2 flex flex-col items-center mt-16">
          <div
            className="fixed flex flex-col items-center bg-white w-1/2"
            style={{
              zIndex: 1000,
            }}
          >
            <h2
              className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
              style={{
                letterSpacing: "10px",
              }}
            >
              Carrito de compras
            </h2>
            {empty === false ? (
              <button
                onClick={goToOrder}
                className="bg-blue-600 hover:bg-blue-500 text-white uppercase rounded-md p-2 font-semibold scale-up-center"
              >
                <i className="fas fa-boxes p-1"></i>
                Hacer Pedido
              </button>
            ) : (
              ""
            )}
          </div>
          <article className="w-full flex flex-col mt-32 items-center">
            {data.map((el, index) => (
              <ItemOrder
                key={index}
                data={el}
                deleteProductCart={deleteProductCart}
                alertShow={alertShow}
              />
            ))}
            {empty && <NoneData />}
            {loading && <Loader />}
          </article>
          <Toaster position="top-center" />
        </section>
      )}
    </section>
  );
}
