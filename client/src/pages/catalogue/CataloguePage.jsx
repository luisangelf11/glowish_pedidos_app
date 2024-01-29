/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import MenuUser from "../../components/MenuUser";
import Loader from "../../components/Loader";
import "../../assets/css/animation.css";
import { filterProducts, getProducts } from "../../api/products";
import ItemProduct from "../../components/ItemProduct";
import ErrorData from "../../components/ErrorData";
import "../../assets/css/loader.css";
import { useLocation } from "react-router-dom";
import NoneData from "../../components/NoneData";

export default function Catalogue() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [empty, setEmpty] = useState(false);

  //Query URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const find = queryParams.get("search");

  console.log(location)

  //Use Ref for scroll infinite
  const elementRef = useRef(null);

  const getData = async () => {
    try {
      const res = await getProducts(2, offset);
      // console.log(res.data);
      if (res.data.length === 0) setHasMore(false);
      else {
        setTimeout(() => {
          setData([...data, ...res.data]);
          //console.log(data)
          setOffset((offset) => offset + 2);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const getFilterData = async () => {
    try {
      setHasMore(true);
      setData([]);
      setEmpty(false);
      const res = await filterProducts(find);
      setTimeout(() => {
        setHasMore(false);
        setData(res.data);
        if(res.data.length === 0) setEmpty(true); 
      }, 3000);
    } catch (err) {
      setError(true);
    }
  };
  
  const onIntersection = async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) await getData();
  };

  useEffect(() => {
    if (location.search !== "") {
      getFilterData();
    } else {
      const observer = new IntersectionObserver(onIntersection);
      if (observer && elementRef.current) observer.observe(elementRef.current);

      return () => {
        if (observer) observer.disconnect();
      };
    }
  }, [find || data]);

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
            Catálogo de productos
          </h2>
          {data.length
            ? data.map((el, index) => <ItemProduct key={index} data={el} />)
            : ""}
          {hasMore && <Loader elementRef={elementRef} />}
          {empty ? <NoneData /> : ''}
        </article>
      )}
    </section>
  );
}
