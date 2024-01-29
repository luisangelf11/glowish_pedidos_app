import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import Loader from "../../components/Loader";
import "../../assets/css/animation.css";
import { getProducts } from "../../api/products";
import ItemProduct from "../../components/ItemProduct";
import ErrorData from "../../components/ErrorData";

export default function Catalogue() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const res = await getProducts(20, 0);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <article className="w-full flex flex-col items-center">
          <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Catálogo de productos
          </h2>
          {data.length
            ? data.map((el) => <ItemProduct key={el.Id} data={el} />)
            : ""}
          {isLoading && <Loader />}
        </article>
      )}
    </section>
  );
}
