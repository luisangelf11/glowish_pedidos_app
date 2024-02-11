import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ItemOrder from "./ItemOrder";
import { getCarts } from "../../api/cart";
import { useAuthContext } from "../../context/authContext";

export default function CartPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const {user} = useAuthContext();

    const getData = async()=>{
        try{
            const res = await getCarts(user.Id, user.Token);
            setData(res.data);
        }
        catch{
            setError(true);
        }
    }

    useEffect(()=>{
        getData();
    }, []);

  return (
    <section className="flex flex-col  h-screen">
      <MenuUser />
      <section className="w-full gap-2 flex flex-col items-center mt-16">
        <h2
          className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
          style={{
            letterSpacing: "10px",
          }}
        >
          Carrito de compras
        </h2>
        <article className="w-full flex flex-col items-center">
            {data.map((el, index)=> <ItemOrder key={index} data={el}/>)}
        </article>
      </section>
    </section>
  );
}
