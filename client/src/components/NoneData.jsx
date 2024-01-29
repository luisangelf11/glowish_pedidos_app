import React from "react";
import noneData from "../assets/noneData.jpg";
import '../assets/css/animation.css'

export default function NoneData() {
  return (
    <div className="flex flex-col items-center m-auto w-10/12 gap-4 scale-up-center">
      <img src={noneData} alt="Empty" className=" w-64 object-cover" />
      <h3 className="text-xl uppercase text-center font-bold p-2 text-red-500">
        ¡No se encontrarón datos!
      </h3>
      <p className="text-sm">
        Lo sentimos mucho pero no pudimos encontrar ningún resultado de tu
        busqueda.
      </p>
    </div>
  );
}
