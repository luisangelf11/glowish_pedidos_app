import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { getOrdersUser } from "../../api/orders";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context/authContext";
import ItemOrder from "./ItemOrder";
import Modal from "../../components/Modal";

export default function ListOrdersPage() {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [pedidoId, setPedidoId] = useState(0);

  const { user } = useAuthContext();

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await getOrdersUser(user.Id);
      setTimeout(() => {
        setIsLoading(false);
        setData(res.data);
      }, 3000);
    } catch {
      setError(true);
    }
  };

  const handleClose = () => {
    setModal(false);
    setPedidoId(0);
  };

  const openModal = (id) => {
    setModal(true);
    setPedidoId(id)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <section className="w-full gap-2 flex flex-col items-center mt-16">
          <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Listado de pedidos
          </h2>
          {modal && (
            <Modal onClose={handleClose} title={`Pedido: #${pedidoId}`}>
              <table>adjkasdjkl</table>
            </Modal>
          )}
          {data.map((el, index) => (
            <ItemOrder key={index} data={el} openModal={openModal} />
          ))}
          {isLoading && <Loader />}
        </section>
      )}
    </section>
  );
}
