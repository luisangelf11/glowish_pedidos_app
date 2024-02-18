"use client";
import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../context/orderContext";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createOrderCheckout } from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import ItemCreateOrder from "./ItemCreateOrder";
import { useAuthContext } from "../../context/authContext";
import "../../assets/css/animation.css";
import { useTimeNowSQL } from "../../hooks/useTimeNowSQL";
import { createOrder, updateOrder } from "../../api/orders";
import { useDetail } from "../../hooks/useDetail";

export default function CreateOrderPage() {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [orderData, setOrderData] = useState({});
  const [paypal, setPaypal] = useState(false);

  const { order } = useOrderContext();
  const { user } = useAuthContext();
  const {dateNowSQL} = useTimeNowSQL();
  const {generateDetailOrder} = useDetail();

  const navigate = useNavigate();

  const getDataOrder = () => {
    setData(order);
    let suma = 0;
    order.forEach((el) => {
      suma += el.total;
    });
    let usd = Math.round(parseFloat(suma + 300) * 0.017);
    setSubTotal(suma);
    setTotalUSD(usd);
  };

  useEffect(() => {
    getDataOrder();
    if (order.length === 0) navigate("/carrito");
  });
  

  const generateOrder = async () => {
    try {
       setPaypal(true);
      toast.success(`Su pedido fue generado. Culmine el proceso pagando con su cuenta de paypal usando el botón inferior azul.`);
      const objOrder = {
        estado: 'Solicitado',
        fecha: dateNowSQL(),
        monto: parseFloat(subtotal + 300),
        id_usuario: user.Id
      }
      const res = await createOrder(objOrder, user.Token)
      setOrderData(res.data)
    } catch{
      setError(true);
    }
  };

  const cancelOrder =async()=>{
    try {
      const objOrder = {
        estado: 'Cancelado',
      }
      await updateOrder(orderData.id, objOrder, user.Token);
      toast.success(`¡Su pedido fue cancelado!`);
      setPaypal(false);
      setTimeout(()=>{
        navigate('/carrito');
      }, 3000);
    } catch {
      setError(true);
    }
  }

  const handleClick = ()=>{
    if(paypal) cancelOrder();
    else generateOrder();
  }

  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <section className="w-full gap-2 flex flex-col items-center mt-16 scale-up-center">
          <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Crear Pedido
          </h2>
          <article className=" w-3/5 h-60 border-b p-2 overflow-y-auto">
            {data.map((el, index) => (
              <ItemCreateOrder key={index} data={el} />
            ))}
          </article>
          <article className="mt-4 p-2 border-b w-3/5 text-sm flex justify-around">
            <div>
              <p className="text-gray-600 font-semibold">
                Costo de envío: $RD 300.00
              </p>
              <p className="text-gray-600 font-semibold">
                SubTotal de compra: $RD {parseFloat(subtotal).toFixed(2)}
              </p>
              <p className="text-gray-600 font-semibold">
                Total neto: $RD {parseFloat(subtotal + 300).toFixed(2)}= $USD{" "}
                {totalUSD.toFixed(2)}
              </p>
            </div>
            <div>
              <button
                onClick={handleClick}
                className={`${
                  paypal
                    ? "bg-red-700 hover:bg-red-600"
                    : "bg-green-700 hover:bg-green-600 "
                } transition-all text-white p-2 rounded-sm`}
              >
                {paypal ? "Cancelar pedido" : "Generar pedido"}
              </button>
            </div>
          </article>
          {paypal && (
            <article className="mt-4 p-4 scale-up-center">
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AZSnKN2nHdzqnu3nRXf1viTZQt7l8uALsSO1_B1WhvJIMEGjPoiWZdp2LThNf92oPgREKJFX41eM8zXi",
                }}
              >
                <PayPalButtons
                  style={{
                    color: "blue",
                    layout: "horizontal",
                    label: "buynow",
                  }}
                  createOrder={async () => {
                    try {
                      const order = await createOrderCheckout({
                        id_pedido: orderData.id,
                        monto: parseFloat(totalUSD)
                      });
                      console.log(order.data.id);
                      return order.data.id;
                    } catch (err) {
                      toast.error(err);
                    }
                  }}
                  onApprove={(data, actions) => {
                    //console.log(data);
                    generateDetailOrder(order, orderData.id, user.Token)
                    actions.order.capture();
                    toast.success(`!Pago completado! Redireccionando al carrito de compras`);
                    setTimeout(()=>{
                      navigate('/carrito');
                    }, 3000);
                  }}
                  onCancel={(data) => {
                    console.log(data);
                    toast.error(`El pago ${data.orderID} fue cancelado. Redireccionando al carrito.`);
                    cancelOrder();
                  }}
                />
              </PayPalScriptProvider>
            </article>
          )}
          <Toaster position="top-center" />
        </section>
      )}
    </section>
  );
}
