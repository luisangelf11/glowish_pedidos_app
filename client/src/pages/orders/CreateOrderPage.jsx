import React, { useState } from "react";
import { useOrderContext } from "../../context/orderContext";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";

export default function CreateOrderPage() {
  const [error, setError] = useState(false);
  const { order } = useOrderContext();
  console.log(order);
  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <section className="w-full gap-2 flex flex-col items-center mt-16">
            <h2>Crear pedido</h2>
        </section>
      )}
    </section>
  );
}
