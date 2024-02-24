import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import { useAuthContext } from "../../context/authContext";
import imgDesc from "../../assets/descuentoIcon.png";
import { useNavigate } from "react-router-dom";

export default function CardProductFive({ id }) {
  const [product, setProduct] = useState({});
  const { user } = useAuthContext();
  const getDataProduct = async () => {
    try {
      const res = await getProduct(id);
      setProduct(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateNewPrice = () => {
    let desc = parseFloat(product.Precio) * parseFloat(product.Descuento / 100);
    let newPrice = parseFloat(product.Precio) - parseFloat(desc);
    return newPrice;
  };

  useEffect(() => {
    getDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleClick =(e)=>{
    navigate(`/catalogo/${product.Id}`);
  } 

  return (
    <div
      className="flex flex-col w-56 border h-full rounded-xl mt-4 ml-4 bg-white"
      data-aos="fade-up"
    >
      <img
        className="w-56 h-60 object-cover cursor-pointer transition-all hover:grayscale hover:scale-75 hover:rounded-xl"
        style={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
        src={product.Imagen}
        alt={product.Id}
      />
      <div className="border-b">
        <h3 className="font-bold uppercase text-red-500 p-2 border-b">
          {product.Nombre}
        </h3>
        <p className="text-sm p-1">{product.Descripcion}</p>
        {product.Descuento > 0 ? (
          <p className="p-1 font-semibold text-red-400">
            <del>RD$ {product.Precio.toFixed(2)}</del> <br />{" "}
            <span>RD$ {generateNewPrice().toFixed(2)}</span>
          </p>
        ) : (
          <p className="p-1 font-semibold text-red-400">
            <span>RD$ {parseFloat(product.Precio).toFixed(2)}</span>
          </p>
        )}
      </div>
      {product.Descuento > 0 ? (
        <div className="flex items-center gap-2 p-2">
          <img className="w-6 h-6" src={imgDesc} alt="icon-descuento" />
          <p className="text-sm font-semibold text-slate-600">
            {product.Descuento}%
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-2 h-12 justify-end items-end p-2">
        <button onClick={handleClick} className="bg-red-500 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-400">
          Ver
        </button>
      </div>
    </div>
  );
}
