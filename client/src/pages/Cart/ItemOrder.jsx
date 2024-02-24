import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/products";
import { Link } from "react-router-dom";
import { updateCart } from "../../api/cart";
import { useAuthContext } from "../../context/authContext";
import { useToken } from "../../hooks/useToken";

export default function ItemOrder({ data, alertShow, openAlert, userOut }) {
  const { Id, Id_Producto, Unidades, Size, Color, Seleccionado } = data;
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
  const [select, setSelect] = useState(Seleccionado);
  const [validateProduct, setValidateProduct] = useState({});

  const { user } = useAuthContext();
  const { invalidToken } = useToken();

  const generateNewPrice = (precio, descuento) => {
    let desc = parseFloat(precio) * parseFloat(descuento / 100);
    let newPrice = parseFloat(precio) - parseFloat(desc);
    return newPrice;
  };

  const getData = async () => {
    try {
      const res = await getProduct(Id_Producto);
      setValidateProduct(res.data);
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
  }, []);

  const validateStatusQuantityProduct = () => {
    if (product.unidades > validateProduct.Unidades) return true;
    else false;
  };

  const changeSelect = async () => {
    try {
      const newSelect = {
        seleccionado: Seleccionado === 0 ? 1 : 0,
      };
      await updateCart(Id, newSelect, user.Token);
      if(select === 0)setSelect(1);
      else setSelect(0)
    } catch (error) {
      if (error.response.status === 401) {
        userOut();
        invalidToken();
      } else console.log(error);
    }
  };

  const handleSelect = () => {
    if (!validateStatusQuantityProduct()) changeSelect();
    else alertShow();
  };

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
          {validateProduct.Unidades === 0 ? (
            <p className="text-md text-red-500 font-bold p-1">¡AGOTADO!</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center p-2">
        {validateProduct.Unidades === 0 ? (
          ""
        ) : (
          <button
            onClick={handleSelect}
            className={`${
              select === 0 ? "bg-yellow-600" : "bg-green-600"
            } p-2 w-10 rounded-md text-sm text-white transition-all ${
              select === 0
                ? "hover:bg-yellow-500"
                : "hover:bg-green-500"
            } `}
          >
            {select === 0 ? (
              <i className="fas fa-hand-point-up"></i>
            ) : (
              <i className="fas fa-check"></i>
            )}
          </button>
        )}
        <button
          onClick={() => openAlert(product.id)}
          className="bg-red-700 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-600"
        >
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
