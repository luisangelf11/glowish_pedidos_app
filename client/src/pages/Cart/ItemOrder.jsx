import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import { Link } from "react-router-dom";

export default function ItemOrder({ data }) {
  const { Id, Id_Producto, Unidades, Size, Color } = data;
  const initialValue = {
    id: Id,
    id_producto: Id_Producto,
    nombre: "",
    imagen: "",
    precio: "",
    descuento: "",
    unidades: Unidades,
    size: Size,
    color: Color,
    total: "",
  };
  const [product, setProduct] = useState(initialValue);

  const generateNewPrice = (precio, descuento) => {
    let desc = parseFloat(precio) * parseFloat(descuento / 100);
    let newPrice = parseFloat(precio) - parseFloat(desc);
    return newPrice;
  };

  const getData = async () => {
    try {
      const res = await getProduct(Id_Producto);
      setProduct({
        ...product,
        nombre: res.data.Nombre,
        imagen: res.data.Imagen,
        precio: res.data.Precio,
        descuento: res.data.Descuento,
        total: generateNewPrice(res.data.Precio, res.data.Descuento) * Unidades,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    console.log(product);
  }, []);

  return (
    <div
      className="flex justify-start gap-2 mt-2 border-b w-1/2"
      data-aos="zoom-in-up"
    >
      <div className="w-11/12 flex gap-8">
        <div>
          <img
            src={product.imagen}
            alt={Id}
            className="w-48 h-48 object-cover rounded-md hover:scale-75 cursor-pointer transition-all"
          />
          <h3 className="text-center text-base p-2 uppercase font-semibold text-red-400">
            {product.nombre}
          </h3>
        </div>
        <div className="w-auto">
          <h3 className="text-center text-base p-2 uppercase font-semibold text-red-400">
            Descripción
          </h3>
          <p className="text-xs text-gray-600 font-semibold">
            Color: <span className="text-red-400">{product.color}</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold">
            Size: <span className="text-red-400">{product.size}</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold">
            Unidades seleccionadas:{" "}
            <span className="text-red-400">{product.unidades}</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold">
            Precio:{" "}
            <span className="text-red-400">
              {parseFloat(product.precio).toFixed(2)}
            </span>
          </p>
          <p className="text-xs text-gray-600 font-semibold">
            Descuento:{" "}
            <span className="text-red-400">{product.descuento}%</span>
          </p>
          <p className="text-xs text-gray-600 font-semibold">
            Total:{" "}
            <span className="text-red-400">
              {parseFloat(product.total).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center p-2">
        <button className="bg-yellow-600 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-yellow-500">
          <i className="fas fa-hand-point-up"></i>
        </button>
        <button className="bg-red-700 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-600">
          <i className="fas fa-trash"></i>
        </button>
        <Link
          to={`/catalogo/${Id_Producto}`}
          className="bg-blue-500 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-blue-400"
        >
          <i className="fas fa-tshirt p-1"></i>
        </Link>
      </div>
    </div>
  );
}
