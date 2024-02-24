import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { getCategorys } from "../../api/category";
import { getProductCategorys, getRandomProductFive } from "../../api/products";
import NoneData from '../../components/NoneData'
import ItemProduct from "../../components/ItemProduct";
import Loader from "../../components/Loader";
import "../../assets/css/scrollStyle.css"

export default function ListCategoryPage() {
  const [categorys, setCategorys] = useState([]);
  const [error, setError] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getCategorysData = async () => {
    try {
      const res = await getCategorys();
      setCategorys(res.data);
    } catch (err) {
      setError(false);
    }
  };

  const getRandomData = async()=>{
    try {
        const res = await getRandomProductFive();
        setEmpty(false);
        setIsLoading(true);
        setTimeout(()=> {
          setIsLoading(false)
            setData(res.data);
            if(res.data.length) setEmpty(false);
            else setEmpty(true);
          }, 2000);
    } catch  {
      setError(false)
    }
  }

  const getProducts = async(id, name)=>{
    try{
        setData([]);
        setEmpty(false);
        setcategoryName(name)
        const res = await getProductCategorys(id);
        setIsLoading(true);
        setTimeout(()=> {
          setIsLoading(false)
            setData(res.data);
            if(res.data.length) setEmpty(false);
            else setEmpty(true);
          }, 3000);
    }
    catch(err){
      setError(false);
    }
  }

  useEffect(()=>{
    getCategorysData()
    getRandomData();
  }, []);

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex items-center mt-16">
            <nav className="flex flex-col items-center w-60 h-60 border rounded-md fixed overflow-y-auto scrollNew" style={{zIndex: 1000, top: 200, left: 40}} >
              <h3 className="font-semibold text-red-500 p-2">Lista de categorías</h3>
            {categorys.map((el, index) => (
                <button key={index} onClick={()=> getProducts(el.Id, el.Nombre)} className="bg-red-500 text-white p-2 rounded-sm text-sm w-36 mt-4 hover:bg-red-400 transition-all">
                  {el.Nombre}
                </button>
              ))}
            </nav>
            <article className=" flex flex-col w-full items-center">
            <h2
                className="p-6 uppercase text-red-400 text-md font-bold scale-up-center"
                style={{
                  letterSpacing: "10px",
                }}
              >
                {categoryName === "" ? "Algúnos productos random" : `Productos de la categoría (${categoryName})`}:
              </h2>
          {isLoading && <Loader />}
          {empty && <NoneData />}
          {data.length > 0 ? data.map((el, index)=> <ItemProduct key={index} data={el}/>) : ''}
            </article>
          </article>
      )}
    </section>
  );
}
