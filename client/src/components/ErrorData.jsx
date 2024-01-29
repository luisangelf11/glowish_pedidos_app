import React from "react";
import errorIMG from "../assets/error.jpg";
import "../assets/css/animation.css";

export default function ErrorData() {
  return (
    <div className="flex flex-col items-center m-auto w-10/12 gap-4 scale-up-center">
      <img src={errorIMG} alt="Error" className=" w-1/2 object-cover" />
      <h3 className="text-xl uppercase text-center font-bold p-2 text-red-500">
        ¡Ups! Algo salió mal 😢
      </h3>
      <p className="text-sm">Revisa tu conexión a internet. Si el problema persiste comunicate con nosotros. </p>
    </div>
  );
}
