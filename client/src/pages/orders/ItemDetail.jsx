import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/products";

export default function ItemDetail({ data }) {
  const { Id_Producto, Unidades, Descuento, Size, Color, SubTotal } = data;
  const [product, setProduct] = useState({});

  const getDataProduct = async () => {
    try {
      const res = await getProduct(Id_Producto);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);
  return (
    <div className="flex justify-center gap-5">
      <div>
        <img src={product.Imagen} alt="Product Image" className="w-40 h-40 object-cover rounded-sm"/>
        <h3 className="text-center font-bold text-red-500 uppercase p-1">{product.Nombre}</h3>
      </div>
      <div className="text-sm text-gray-600 font-semibold">
        <p>Unidades: {Unidades}</p>
        <p>Precio Unitario: RD$ {parseFloat(product.Precio).toFixed(2)}</p>
        <p>SubTotal: RD$ {parseFloat(SubTotal).toFixed(2)}</p>
        <p>Color: {Color}</p>
        <p>Size: {Size}</p>
        <p>Descuento: {Descuento}%</p>
      </div>
    </div>
  );
}
