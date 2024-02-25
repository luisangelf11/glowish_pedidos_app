import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ItemOrder from "./ItemOrder";
import { deleteCart, getCarts, getDashCart } from "../../api/cart";
import { useAuthContext } from "../../context/authContext";
import { toast, Toaster } from "react-hot-toast";
import ErrorData from "../../components/ErrorData";
import { useNavigate } from "react-router-dom";
import NoneData from "../../components/NoneData";
import Loader from "../../components/Loader";
import { useToken } from "../../hooks/useToken";
import MyAlert from "../../components/MyAlert";

export default function CartPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myAlert, setMyAlert] = useState(false);
  const [dash, setDash] = useState({});
  const [idToDelete, setIdToDelete] = useState(null);

  const { user } = useAuthContext();
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

  const getDash = async()=>{
    try {
      const res = await getDashCart(user.Id);
      setDash(res.data);
      console.log(res.data)
    } catch  {
      setError(true);
    }
  }

  useEffect(() => {
    getData();
    getDash();
  }, []);

  const goToOrder = () => {
      toast.success(`Redirigiendo al generador de pedidos...`);
      setTimeout(() => {
        navigate("/crear-pedido");
      }, 3000);
  };

  const deleteProductCart = async () => {
    try {
      await deleteCart(idToDelete, user.Token);
      toast.success(`¡Producto eliminado del carrito!`);
      setData([]);
      getData();
      setMyAlert(false);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const userOut = () => toast.error(`Acceso denegado, su sesión expiró`);

  const alertShow = () => {
    toast.error(
      `Este producto no cuenta con las unidades suficientes para ser vendido. Por favor, verifique cuantas unidades disponibles tiene este producto`
    );
  };

  const closeAlert = () => {
    setMyAlert(false);
    setIdToDelete(null);
  };

  const openAlert = (id) => {
    setMyAlert(true);
    setIdToDelete(id);
  };

  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <section className="w-full flex flex-col items-center mt-14">
          <div
            className="fixed flex flex-col h-auto items-center bg-white w-full"
            style={{
              zIndex: 900,
            }}
          >
            <h2
              className="p-2 uppercase text-red-400 text-xl font-bold scale-up-center"
              style={{
                letterSpacing: "10px",
              }}
            >
              Carrito de compras
            </h2>
            {empty === false ? (
             <div className="p-2 border-b-2 flex-col flex items-center">
               <button
                onClick={goToOrder}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 scale-up-center text-sm"
              >
                <i className="fas fa-boxes p-1"></i>
                Hacer Pedido
              </button>
              {data.length > 0 ? <p className="text-gray-700 text-sm font-semibold p-1">Total a pagar: RD$ 
              <span>{dash.subTotal === null ? '0': parseFloat(dash.subTotal).toFixed(2)}</span> | Seleccionados: <span>{dash.seleccionados}/{data.length}</span></p> : ''}
             </div>
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
                openAlert={openAlert}
                userOut={userOut}
                dash={getDash}
              />
            ))}
            {empty && <NoneData />}
            {loading && <Loader />}

            {myAlert && (
              <MyAlert
                title={"Eliminar del carrito"}
                text={"¿Estás seguro de que deseas eliminar este producto?"}
                onClose={closeAlert}
                onAction={deleteProductCart} 
              />
            )}
          </article>
          <Toaster position="top-center" />
        </section>
      )}
    </section>
  );
}
