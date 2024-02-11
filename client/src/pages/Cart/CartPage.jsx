import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ItemOrder from "./ItemOrder";
import { deleteCart, getCarts } from "../../api/cart";
import { useAuthContext } from "../../context/authContext";
import {toast, Toaster} from 'react-hot-toast'

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

    const deleteProductCart = async(id)=>{
      try{
        let answer = confirm(`¿Deseas eliminar este producto del carrito de compras?`);
       if(answer){
        await deleteCart(id, user.Token);
        toast.success(`¡Producto eliminado del carrito!`);
        getData();
      } 
      }
      catch(err){
        setError(true);
      }
    }

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
            {data.map((el, index)=> <ItemOrder key={index} data={el} deleteProductCart={deleteProductCart}/>)}
        </article>
      </section>
      <Toaster position="top-center"/>
    </section>
  );
}
