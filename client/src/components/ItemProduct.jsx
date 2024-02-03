import React, { useEffect, useState } from "react";
import imgDesc from "../assets/descuentoIcon.png";

export default function ItemProduct({ data }) {
  const {
    Id,
    Nombre,
    Precio,
    Unidades,
    Descripcion,
    Imagen,
    Descuento,
    Categoria,
  } = data;

  const generateNewPrice = () => {
    let desc = parseFloat(Precio) * parseFloat(Descuento / 100);
    let newPrice = parseFloat(Precio) - parseFloat(desc);
    return newPrice;
  };

  const handleClickImg = () => {
    window.location.href = `${Imagen}`;
  };

  return (
    <div
      className="flex justify-start gap-2 mt-2 border-b w-1/2"
      data-aos="zoom-in-up"
    >
      <div className="w-11/12 flex gap-8">
        <div>
          <img
            src={Imagen}
            alt={Id}
            onClick={handleClickImg}
            className="w-48 h-48 object-cover rounded-md hover:scale-75 cursor-pointer transition-all"
          />
          <h3 className="text-center text-base p-2 uppercase font-semibold text-red-400">
            {Nombre}
          </h3>
        </div>
        <div className="w-auto">
          <p className="text-sm">{Descripcion}</p>
          {Descuento > 0 ? (
            <p className="p-1 font-semibold text-red-400">
              <del>$RD {Precio.toFixed(2)}</del> <br />{" "}
              <span>$RD {generateNewPrice().toFixed(2)}</span>
            </p>
          ) : (
            <p className="p-1 font-semibold text-red-400">
              <span>$RD {parseFloat(Precio).toFixed(2)}</span>
            </p>
          )}
          {Descuento > 0 ? (
            <div className="flex items-center gap-2 p-2">
              <img className="w-6 h-6" src={imgDesc} alt="icon-descuento" />
              <p className="text-sm font-semibold text-slate-600">
                {Descuento}%
              </p>
            </div>
          ) : (
            ""
          )}
          <p className="text-xs text-gray-600 font-semibold">
            Unidades disponibles: {Unidades}
          </p>
          {Categoria && (
            <span
              className="p-1 text-center mt-2 border rounded-xl block text-xs text-red-500"
              style={{
                width: "40%",
              }}
            >
              {Categoria}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 justify-end items-end p-2">
        <button className="bg-red-500 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-400">
          Ver
        </button>
      </div>
    </div>
  );
}
