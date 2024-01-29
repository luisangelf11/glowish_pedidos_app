import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import Loader from "../../components/Loader";
import ItemProduct from "../../components/ItemProduct";
import { getProducts } from "../../api/products";

export default function NewPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    const getData = async ()=>{
        try{
            const res = await getProducts(20, 0);
            setData(res.data);
        }
        catch(err){
            setError(true);
        }
    }

    useEffect(()=>{
        setTimeout(()=> {
            setIsLoading(false)
            getData();
        }, 3000);
    }, []);

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex flex-col items-center mt-16">
             <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Nuevos productos
          </h2>
          {data.length
            ? data.map((el, index) => <ItemProduct key={index} data={el} />)
            : ""}
          {isLoading && <Loader />}
        </article>
      )}
    </section>
  );
}
