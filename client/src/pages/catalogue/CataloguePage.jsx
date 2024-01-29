/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import MenuUser from "../../components/MenuUser";
import Loader from "../../components/Loader";
import "../../assets/css/animation.css";
import { getProducts } from "../../api/products";
import ItemProduct from "../../components/ItemProduct";
import ErrorData from "../../components/ErrorData";
import '../../assets/css/loader.css'

export default function Catalogue() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const elementRef = useRef(null);

  const getData = async () => {
    try {
      const res = await getProducts(2, offset);
     // console.log(res.data);
      if(res.data.length === 0) setHasMore(false);
      else{
        setTimeout(()=>{
          setData([...data, ...res.data]);
          console.log(data)
        setOffset(offset => offset + 2);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const onIntersection =async(entries)=>{
    const firstEntry = entries[0];
    if(firstEntry.isIntersecting && hasMore) await getData();
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if(observer && elementRef.current) observer.observe(elementRef.current);

    return ()=>{
      if(observer) observer.disconnect();
    }

  }, [data]);

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex flex-col items-center">
          <h2
            className="p-6 uppercase text-red-400 text-xl font-bold scale-up-center"
            style={{
              letterSpacing: "10px",
            }}
          >
            Catálogo de productos
          </h2>
          {data.length
            ? data.map((el, index) => <ItemProduct key={index} data={el} />)
            : ""}
          {hasMore && <Loader elementRef={elementRef} />}
        </article>
      )}
    </section>
  );
}
