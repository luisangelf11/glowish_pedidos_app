import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import { useAuthContext } from "../../context/authContext";
import imgDesc from "../../assets/descuentoIcon.png";

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
  useEffect(() => {
    getDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="flex flex-col w-56 border h-auto rounded-xl mt-4 ml-4 bg-white"
      data-aos="fade-up"
    >
      <img
        className="w-56 h-60 object-cover cursor-pointer hover:grayscale"
        style={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
        src={product.Imagen}
        alt={product.Id}
      />
      <div>
        <h3 className="font-bold uppercase text-red-500 p-2 border-b">
          {product.Nombre}
        </h3>
        <p className="text-sm p-1" >{product.Descripcion}</p>
        <p className="p-1 font-semibold text-red-400">$RD {product.Precio}</p>
      </div>
      {product.Descuento > 0 ? (
        <div className="flex items-center gap-1 p-1">
          <img className="w-6 h-6" src={imgDesc} alt="icon-descuento" />
          <p className="text-sm font-semibold text-slate-600">{product.Descuento}%</p>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-2 h-12 justify-end items-end p-2">
        <button className="bg-red-500 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-400">
          Ver
        </button>
        {user !== null ? (
          <button className="border-2 w-10 h-10 text-md border-green-700 p-2 rounded-md text-green-700 transition-all hover:border-gray-600 hover:text-gray-600">
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
